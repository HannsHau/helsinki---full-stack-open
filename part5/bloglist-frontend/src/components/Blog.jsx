import { useState } from 'react'

const Blog = ({ blog, user, changeBlog, removeBlog }) => {
  const [details, setDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const userIsAuthor = () => {
    if ( blog === null || blog.username === null || user === null ) { return false }
    return (blog.user.username === user.username)
  }

  const buttonRemove = {
    borderRadius: '5px',
    backgroundColor: 'blue',
    display: userIsAuthor ? '' : 'none'
  }

  const toggleState = () => {
    setDetails(!details)
  }

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`) ) {
      removeBlog(blog)
    } else {
      console.log('abort by user')
    }
  }

  const normalView = () => {
    return (`${blog.title} ${blog.author}`)
  }

  const addLike = async () => {
    blog.likes += 1
    changeBlog(blog)
  }

  const detailsView = () => {
    return (<div>
      <li>{blog.url}</li>
      <li>likes: {blog.likes}<button onClick={addLike}>like</button></li>
      <li>{blog.user.name}</li>
      <button onClick={handleRemoveBlog} style={buttonRemove}>remove</button>
    </div>)
  }

  return (
    <div style={blogStyle}>
      {normalView()}
      <button onClick={toggleState} >{details?'hide':'view'}</button>
      {details?detailsView():''}
    </div>
  )
}

export default Blog