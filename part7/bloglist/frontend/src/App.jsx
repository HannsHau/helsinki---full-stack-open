import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { setTimedNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector( state => state.notification )
  const blogs = useSelector(state => state.blogs ) 

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const addBlogRef = useRef()

  const prepareNotification = (text, error) => {
    const payload = { text: text, error: error }
    dispatch(setTimedNotification(payload, 3))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('Login successful: ', user)
    } catch {
      prepareNotification('wrong username or password', true)
      console.log('Login failed: ', user)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    console.log('user clicked logout')
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
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
