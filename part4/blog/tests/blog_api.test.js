const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  assert(Object.hasOwn(blogToView, "id"))
  assert(!Object.hasOwn(blogToView, "_id"))

})

test('verify post of blog entry', async () => {
  
  const newBlog = {
    title: "Böse Menschen, böse Lieder",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titels = blogsAtEnd.map(n => n.title)
  assert(titels.includes('Böse Menschen, böse Lieder'))
})

test('verify that likes are set to 0 if not provided', async () => {
  
  const newBlog = {
    title: "without any likes: title",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const isTitle = (blogs) => {
    return blogs.title === "without any likes: title"
  }

  const foundBlog = blogsAtEnd.find(isTitle)

  assert.strictEqual(foundBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})