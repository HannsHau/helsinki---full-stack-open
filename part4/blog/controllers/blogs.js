const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  blog.user = request.user
  const user = request.user

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {

  const user = request.user
  const blog = await Blog.findById(request.params.id)

  console.log("blog_id: ", blog.user.toString())
  console.log("user_id: ", user.id.toString())

  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
  } else {
    return response.status(401).json({ error: 'not authorized' })
  }
  
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogsRouter
