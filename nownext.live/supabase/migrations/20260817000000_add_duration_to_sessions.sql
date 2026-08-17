-- Migration: Add duration column to sessions table and update RPC functions get_event and update_full_event

-- 1. Add duration column to public.sessions table
ALTER TABLE public.sessions 
ADD COLUMN IF NOT EXISTS duration text;

-- 2. Drop any existing overloaded stored procedures to eliminate ambiguity
DROP FUNCTION IF EXISTS public.get_event(text);
DROP FUNCTION IF EXISTS public.get_event(json);
DROP FUNCTION IF EXISTS public.update_full_event(json);
DROP FUNCTION IF EXISTS public.update_full_event(jsonb);

-- 3. Re-create get_event RPC stored procedure to include duration field in session objects
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

-- 4. Re-create update_full_event RPC stored procedure to save duration to public.sessions
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
      
      INSERT INTO public.spaces (id, event_id, title, now_session_id, order_index)
      VALUES (
        v_space.value->>'id',
        v_event_id,
        v_space.value->>'title',
        NULLIF(v_space.value->>'now', ''),
        v_space_order
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        now_session_id = EXCLUDED.now_session_id,
        order_index = EXCLUDED.order_index;

      -- Upsert sessions for this space
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
            v_session.value->>'subtitle',
            v_session.value->>'time',
            v_session.value->>'duration',
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
    END LOOP;
  END IF;

  RETURN v_event_id;
END;
$$;
