import request from 'supertest'
import app from '../src/app.js'
describe('Posts API', () => {
  let postId = '64632731a22dff2a2de38eb4'
//   describe('POST /api/posts', () => {
//     it('should create a new post', async () => {
//       const response = await request(app)
//         .post('/api/posts')
//         .field('title', 'JEST - This is a title')
//         .field('message', 'This is a message')
//         .field('creator', 'JEST - Seller')
//         .field('selectedFile', 'https://uploads-ssl.webflow.com/576fd5a8f192527e50a4b95c/5ea8524ff5ced809eb2e71d9_things%20to%20do%20in%20mirissa.jpg')
//         .field('likeCount', 1)

//       expect(response.status).toBe(201)
//       expect(response.body).toHaveProperty('message', 'Post created successfully')
//       expect(response.body).toHaveProperty('data')
//     }, 10000)
//   })

  //   describe('GET /api/posts', () => {
  //     it('should get all posts', async () => {
  //       const response = await request(app).get('/api/posts')
  //       expect(response.status).toBe(200)
  //       expect(response.body).toHaveProperty('message', 'Posts retrieved successfully')
  //       expect(response.body).toHaveProperty('data')
  //       expect(response.body.data).toBeInstanceOf(Array)
  //     }, 10000)
  //   })
    // describe('GET /api/posts/:id', () => {
    //   it('should get a post', async () => {
    //     const response = await request(app).get(`/api/posts/${postId}`)
    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('message', 'Post retrieved successfully')
    //     expect(response.body).toHaveProperty('data')
    //     expect(response.body.data).toBeInstanceOf(Object)
    //   }, 10000)
    // })
    describe('PATCH /api/items/:id', () => {
      it('should update a post', async () => {
        const response = await request(app).patch(`/api/items/${postId}`).send({
          itemName: 'JEST - Updated Item',
          cuisine: 'JEST - Updated Cuisine',
          description: 'JEST - Updated item description',
          price: 'JEST - Updated item price',
          img: '/updatedTestImage.jpg',
          location: 'JEST - Updated item map location'
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message', 'Post updated successfully')
        expect(response.body).toHaveProperty('data')
      })
    })
})
