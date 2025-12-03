import fs from 'node:fs/promises'
import path from 'node:path'
import { generateId } from '../../utils/id'

export default defineEventHandler(async () => {
  const filePath = path.join(process.cwd(), 'server/data/events.json')

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const events = JSON.parse(fileContent)

    let id = generateId(8)
    while (events[id]) {
      id = generateId(8)
    }

    const newEvent = {
      id,
      title: 'Unnamed',
      spaces: [
        {
          id: generateId(),
          title: 'Main Space',
          now: '',
          sessions: [
            {
              id: generateId(),
              title: 'Session 1',
              subtitle: '',
              time: ''
            }
          ]
        }
      ]
    }

    events[id] = newEvent
    await fs.writeFile(filePath, JSON.stringify(events, null, 2))

    return {
      id
    }
  } catch (error) {
    console.error('Error generating event:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate event'
    })
  }
})
