import fs from 'node:fs/promises'
import path from 'node:path'
import { generateId } from '../utils/id'

export default defineEventHandler(async (event) => {
    try {
        const filePath = path.join(process.cwd(), 'server/data/events.json')
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const events = JSON.parse(fileContent)

        const newEventId = generateId()
        const newSpaceId = generateId()
        const newSessionId = generateId()

        const newEvent = {
            id: newEventId,
            title: 'Unnamed',
            spaces: [
                {
                    id: newSpaceId,
                    title: 'Main Space',
                    now: '',
                    sessions: [
                        {
                            id: newSessionId,
                            title: 'Session 1',
                            subtitle: '',
                            time: ''
                        }
                    ]
                }
            ]
        }

        events[newEventId] = newEvent

        await fs.writeFile(filePath, JSON.stringify(events, null, 2))

        return newEventId
    } catch (error) {
        console.error('Error generating event:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to generate event'
        })
    }
})
