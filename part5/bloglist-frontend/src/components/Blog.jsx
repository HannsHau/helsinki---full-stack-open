import { useState } from "react"

const Blog = ({ blog, changeBlog }) => {
  const [details, setDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleState = () => {
    setDetails(!details)
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
    </div>)}

  return (
  <div style={blogStyle}>
    {normalView()}
    <button onClick={toggleState} >{details?'hide':'view'}</button>
    {details?detailsView():''}
  </div>  
)}

export default Blog