import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Blog from './components/Blog'
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
              <td>{u.username}</td>
              <td>{u.blogs.length}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
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

  return (
    <Router>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </Router>
  )
}

export default App
