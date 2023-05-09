async function request({ query, body }) {
  return await fetch(`https://fakestoreapi.com/${query}`, body)
    .then(res => res.json())
    .catch(e => {
      console.error(e);
      return []
    })
}

export default {
  get: async ({ query }) => {
    return await request({ query })
  },
  post: async ({ query, body }) => {
    return await request({
      query,
      body: {
        method: 'POST',
        body: JSON.stringify(body)
      }
    })
  },
  put: async ({ query, body }) => {
    return await request({
      query,
      body: {
        method: 'PUT',
        body: JSON.stringify(body)
      }
    })
  },
  delete: async ({query}) => {
    return await request({
      query,
      body: {
        method: 'DELETE'
      }
    })
  }
}