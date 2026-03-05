import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom'

import Blog from './components/Blog'
import { modifyBlog } from './reducers/blogReducer'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from './reducers/userReducer'

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

const Users = () => {
  const users = useSelector(state => state.users) 
  return (
    <div>
      <h2>Users</h2>
      <table key='userstable'>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td><Link to={`/user/${u.id}`}>{u.username}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

const User = () => {
  
  const id = useParams().id
  const user = useSelector( state => state.users.find( u => (u.id === id) ) ) 

  if (!user) return <p>404 not found</p>

  return (
    <>
      <h2>{user.name}</h2>
      <h3>{user.blogs.length > 0 ? 'added blogs' : 'no blogs'}</h3>
      <ul>
        {user.blogs.map(b => ( 
            <li>{b.title}</li>
            ) )}
      </ul>
    </>
  )
}

const BlogPage = () => {
  const dispatch = useDispatch()
  
  const id = useParams().id

  const blog = useSelector( state => state.blogs.find( b => ( b.id === id) ) ) 

  if (!blog) return <p>404 not found</p>

  const addLike = async () => {
    const likedBlog = {...blog, likes: blog.likes + 1}
    dispatch(modifyBlog(likedBlog))
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
      <h3>{blog.comments.length > 0 ? 'comments' : 'no comments'}</h3>
      <ul>
      {blog.comments.map( (comment, index) => (<li key={index}>{comment}</li>) ) }
      </ul>
    </>
  )
}

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div style={{background: 'lightgrey', padding: 5}} >
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span>{user.name} logged in <button onClick={handleLogout}>logout</button></span>
      </div>
      <h2>blog app</h2>
      <Notification notification={notification} />


      <Routes>
        <Route path="/user/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </Router>
  )
}

export default App
