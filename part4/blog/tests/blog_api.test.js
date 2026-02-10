const _ = require('lodash')
const { test, after, beforeEach, describe } = require('node:test')
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

test('new blog needs title and url ', async () => {
  const newBlogWithoutTitle = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }
  const newBlogWithoutUrl = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
  
  assert(true)
  
})


test('succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const ids = blogsAtEnd.map(n => n.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

describe('update an post', () => {
  test('update a blog, incresse the likes', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = structuredClone(blogsAtStart[0]) // need to save the old struct before modification

    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length )

    const isTitle = (blogs) => {
      return blogs.title === blogToUpdate.title
    }

    const foundBlog = blogsAtEnd.find(isTitle)

    assert.strictEqual(foundBlog.likes, blogsAtStart[0].likes + 1)


  })
  test('update a blog, change URL', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = structuredClone(blogsAtStart[0]) // need to save the old struct before modification

    blogToUpdate.url = blogToUpdate.url.concat('_')

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length )

    const isTitle = (blogs) => {
      return blogs.title === blogToUpdate.title
    }

    const foundBlog = blogsAtEnd.find(isTitle)

    assert.strictEqual(foundBlog.url, blogsAtStart[0].url.concat('_'))
  })

  test('update a blog, but it not anymore in the database', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = structuredClone(blogsAtStart[0]) // need to save the old struct before modification

    blogToUpdate.likes += 1
    console.log(blogToUpdate.id)
    blogToUpdate.id = '698b5384935710ce5d004270' //false id

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()
    
    assert(_.isEqual(blogsAtEnd, blogsAtStart ))
  })
})

after(async () => {
  await mongoose.connection.close()
})