import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id || id === 'missing') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Event not found'
    })
  }

  try {
    const filePath = path.join(process.cwd(), 'server/data/events.json')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const events = JSON.parse(fileContent)

    if (events[id]) {
      events[id] = body
      await fs.writeFile(filePath, JSON.stringify(events, null, 2))
      return { success: true, event: events[id] }
    }
  } catch (error) {
    console.error('Error updating events file:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update event'
    })
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'Event not found'
  })
})
