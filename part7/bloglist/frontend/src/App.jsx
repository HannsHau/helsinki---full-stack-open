import { useState, useRef } from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  
  const notification = useSelector( state => state.notification )
  const blogs = useSelector(state => state.blogs ) 
  const user = useSelector(state => state.user )

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addBlogRef = useRef()

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

  const cmpFn = (a, b) => {
    // console.log(`a: ${a.author}_${a.likes}, b: ${b.author}_${b.likes}`)
    return b.likes - a.likes
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>User: {user && user.name}</h3>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <Togglable buttonLabel="create new blog" ref={addBlogRef}>
        <AddBlog ref={addBlogRef}></AddBlog>
      </Togglable>
      {[...blogs].sort(cmpFn).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user.username}
        />
      ))}
    </div>
  )
}

export default App
