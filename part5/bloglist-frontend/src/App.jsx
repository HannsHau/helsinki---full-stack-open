import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const addBlogRef = useRef()

  const prepareNotification = (text, error) => {
    setNotification({text: text, error: error})
    setTimeout(() => setNotification(null), 3000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('Login successful: ', user)
    } catch {
      prepareNotification('wrong username or password', true)
      console.log('Login failed: ', user)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('user clicked logout')
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleNew = async (blogObject) => {

    addBlogRef.current.toggleVisibility()

    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))

    prepareNotification(`a new blog ${blog.title} by ${blog.author} added`, false)
  }

  const modifyBlog = async (blogObject) => {
    const oldBlog = blogs.find(blog => blog.id === blogObject.id)
    const newBlog = await blogService.update(blogObject)
    newBlog.user = oldBlog.user
    setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog ) )
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
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel='create new blog' ref={addBlogRef}>
        <AddBlog createBlog={handleNew}>
        </AddBlog>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} changeBlog={modifyBlog} />
      )}
    </div>
  )
}

export default App