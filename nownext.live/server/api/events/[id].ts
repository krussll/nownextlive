import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

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
      return events[id]
    }
  } catch (error) {
    console.error('Error reading events file:', error)
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'Event not found'
  })
})
