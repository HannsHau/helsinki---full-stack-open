const supertest = require('supertest')
const { test, beforeEach} = require('node:test')
const app = require('../app')

const api = supertest(app)

test('comments are returned as json', async () => {
  await api
    .get('/api/blogs/69a6e8184afacf0de01b0045/comments')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})