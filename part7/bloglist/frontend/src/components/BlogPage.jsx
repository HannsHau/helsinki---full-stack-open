import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { modifyBlog, addCommentToBlog } from "../reducers/blogReducer"

const BlogPage = () => {
  const dispatch = useDispatch()
  const [comment, setComment]= useState()
  
  const id = useParams().id

  const blog = useSelector( state => state.blogs.find( b => ( b.id === id) ) ) 

  if (!blog) return <p>404 not found</p>

  const addLike = async () => {
    const likedBlog = {...blog, likes: blog.likes + 1}
    dispatch(modifyBlog(likedBlog))
  }

  const handleNew = (event) => {
    event.preventDefault()

    console.log('will add comment: ', comment, ' to blog: ', blog.id);
    dispatch(addCommentToBlog(blog.id, comment))
  
  }

  return (
    <>
      <h2>'{blog.title}' by {blog.author}</h2>
      <li><a href={blog.url}>{blog.url}</a></li>
      <li>
        likes: {blog.likes}
        <button onClick={addLike} >like</button>
      </li> 
      <li>added by {blog.user.name}</li> 
      <h3>{blog.comments.length > 0 ? 'comments' : 'no comment yet'}</h3>
      <form onSubmit={handleNew}>
        <input onChange={({ target }) => setComment(target.value)}></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
      {blog.comments.map( (comment, index) => (<li key={index}>{comment}</li>) ) }
      </ul>
    </>
  )
}

export default BlogPage