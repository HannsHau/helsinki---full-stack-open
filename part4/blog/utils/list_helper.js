const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return (blog.likes > max.likes ) ? blog : max
  }
  return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {

  return _(blogs)
    .countBy("author")
    .map((count, author) => ({ author, blogs: count }))
    .maxBy("blogs") ?? null;
}

const mostLikes = (blogs) => {
  
  return _(blogs)
    .groupBy("author")
    .map((authorBlogs, author) => ({
      author,
      likes: _.sumBy(authorBlogs, "likes"),
    }))
  .maxBy("likes") ?? null;
}

module.exports = { dummy , totalLikes, favoriteBlog, mostBlogs, mostLikes}