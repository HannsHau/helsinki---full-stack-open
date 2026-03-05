import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import User from './components/User'
import Users from './components/Users'
import BlogPage from './components/BlogPage'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from './reducers/userReducer'

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
