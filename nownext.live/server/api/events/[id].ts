export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  // Hardcoded data for now
  const spaces = [
    {
      title: 'Rink 1',
      now: '1',
      sessions: [
        {
          id: '1',
          title: 'Test 1',
          subtitle: 'Group A',
          time: ''
        },
        {
          id: '2',
          title: 'Test 2',
          subtitle: 'Group B',
          time: ''
        }
      ]
    }
  ]

  return {
    id,
    title: 'North District Sports',
    spaces
  }
})
