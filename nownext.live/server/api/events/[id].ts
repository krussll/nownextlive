export default defineEventHandler((event) => {
  const name = getRouterParam(event, 'id')
  return {
    hello: name
  }
})
