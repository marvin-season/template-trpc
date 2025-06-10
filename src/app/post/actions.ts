'use server'

export async function getPostsMock() {
  // mock data
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log('getPostsMock')
  return Promise.resolve([
    {
      id: 1,
      name: 'Post 1',
      createdBy: { name: 'John Doe' },
      createdAt: new Date(),
    },
  ])
}
