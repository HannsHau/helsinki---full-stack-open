import { useSelector } from 'react-redux'
import { useRef } from 'react'

import Togglable from './Togglable'
import AddBlog from './AddBlog'
import Blog from './Blog'

const Home = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const addBlogRef = useRef()

  if (addBlogRef === null) {
    return <h2>empty addBlogRef</h2>
  }

  const cmpFn = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={addBlogRef}>
        <AddBlog ref={addBlogRef}></AddBlog>
      </Togglable>
      {[...blogs].sort(cmpFn).map(blog => (
        <Blog key={blog.id} blog={blog} user={user.username} />
      ))}
    </div>
  )
}

export default Home