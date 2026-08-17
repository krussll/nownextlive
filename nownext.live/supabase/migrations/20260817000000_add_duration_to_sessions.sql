-- Migration: Fix column types, FK constraints, add duration column, and update RPC functions

-- 1. Add duration column to public.sessions table
ALTER TABLE public.sessions 
ADD COLUMN IF NOT EXISTS duration text;

-- 2. Ensure all primary and foreign key ID columns are of type text to support custom string IDs
-- Drop existing foreign key constraints first to allow type changes if needed
ALTER TABLE public.spaces DROP CONSTRAINT IF EXISTS spaces_now_session_id_fkey;
ALTER TABLE public.spaces DROP CONSTRAINT IF EXISTS spaces_event_id_fkey;
ALTER TABLE public.sessions DROP CONSTRAINT IF EXISTS sessions_space_id_fkey;

-- Convert ID columns to text type
ALTER TABLE public.events ALTER COLUMN id TYPE text USING id::text;
ALTER TABLE public.spaces ALTER COLUMN id TYPE text USING id::text;
ALTER TABLE public.spaces ALTER COLUMN event_id TYPE text USING event_id::text;
ALTER TABLE public.spaces ALTER COLUMN now_session_id TYPE text USING now_session_id::text;
ALTER TABLE public.sessions ALTER COLUMN id TYPE text USING id::text;
ALTER TABLE public.sessions ALTER COLUMN space_id TYPE text USING space_id::text;

-- Re-create foreign key constraints
ALTER TABLE public.spaces 
  ADD CONSTRAINT spaces_event_id_fkey 
  FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;

ALTER TABLE public.spaces 
  ADD CONSTRAINT spaces_now_session_id_fkey 
  FOREIGN KEY (now_session_id) REFERENCES public.sessions(id) ON DELETE SET NULL;

ALTER TABLE public.sessions 
  ADD CONSTRAINT sessions_space_id_fkey 
  FOREIGN KEY (space_id) REFERENCES public.spaces(id) ON DELETE CASCADE;

-- 3. Update get_event RPC stored procedure to include duration field in session objects
CREATE OR REPLACE FUNCTION public.get_event(event_id text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'id', e.id,
    'title', e.title,
    'user_id', e.user_id,
    'created_at', e.created_at,
    'spaces', COALESCE(
      (
        SELECT json_agg(
          json_build_object(
            'id', sp.id,
            'title', sp.title,
            'now', sp.now_session_id,
            'order_index', sp.order_index,
            'sessions', COALESCE(
              (
                SELECT json_agg(
                  json_build_object(
                    'id', se.id,
                    'title', se.title,
                    'subtitle', se.subtitle,
                    'time', se.time,
                    'duration', se.duration,
                    'order_index', se.order_index
                  ) ORDER BY se.order_index ASC, se.created_at ASC
                )
                FROM public.sessions se
                WHERE se.space_id = sp.id
              ),
              '[]'::json
            )
          ) ORDER BY sp.order_index ASC, sp.created_at ASC
        )
        FROM public.spaces sp
        WHERE sp.event_id = e.id
      ),
      '[]'::json
    )
  ) INTO result
  FROM public.events e
  WHERE e.id = event_id;

  RETURN result;
END;
$$;

-- 4. Update update_full_event RPC stored procedure to safely upsert event, spaces, and sessions
CREATE OR REPLACE FUNCTION public.update_full_event(payload json)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_event_id text;
  v_space record;
  v_session record;
  v_space_order int := 0;
  v_session_order int := 0;
  v_now_session_id text;
BEGIN
  v_event_id := payload->>'id';

  -- Update event title
  UPDATE public.events
  SET title = payload->>'title'
  WHERE id = v_event_id;

  -- Upsert spaces and sessions
  IF payload->'spaces' IS NOT NULL THEN
    FOR v_space IN SELECT * FROM json_array_elements(payload->'spaces')
    LOOP
      v_space_order := v_space_order + 1;
      
      -- Safely sanitize now_session_id (convert '', 'null', 'undefined', or NULL to SQL NULL)
      v_now_session_id := CASE 
        WHEN v_space.value->>'now' IS NULL THEN NULL
        WHEN v_space.value->>'now' IN ('', 'null', 'undefined', 'NULL') THEN NULL
        ELSE v_space.value->>'now'
      END;

      -- Step A: Insert/update space without setting now_session_id first (to avoid FK race conditions)
      INSERT INTO public.spaces (id, event_id, title, order_index)
      VALUES (
        v_space.value->>'id',
        v_event_id,
        v_space.value->>'title',
        v_space_order
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        order_index = EXCLUDED.order_index;

      -- Step B: Upsert sessions for this space
      v_session_order := 0;
      IF v_space.value->'sessions' IS NOT NULL THEN
        FOR v_session IN SELECT * FROM json_array_elements(v_space.value->'sessions')
        LOOP
          v_session_order := v_session_order + 1;

          INSERT INTO public.sessions (id, space_id, title, subtitle, time, duration, order_index)
          VALUES (
            v_session.value->>'id',
            v_space.value->>'id',
            v_session.value->>'title',
            NULLIF(NULLIF(NULLIF(v_session.value->>'subtitle', ''), 'null'), 'undefined'),
            NULLIF(NULLIF(NULLIF(v_session.value->>'time', ''), 'null'), 'undefined'),
            NULLIF(NULLIF(NULLIF(v_session.value->>'duration', ''), 'null'), 'undefined'),
            v_session_order
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            subtitle = EXCLUDED.subtitle,
            time = EXCLUDED.time,
            duration = EXCLUDED.duration,
            order_index = EXCLUDED.order_index,
            space_id = EXCLUDED.space_id;
        END LOOP;
      END IF;

      -- Step C: Update now_session_id after sessions exist
      UPDATE public.spaces
      SET now_session_id = v_now_session_id
      WHERE id = v_space.value->>'id';

    END LOOP;
  END IF;

  RETURN v_event_id;
END;
$$;
