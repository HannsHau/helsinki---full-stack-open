import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const newUrl = baseUrl + '/' + blog.id
  const response = await axios.put(newUrl, blog, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const newUrl = baseUrl + '/' + blog.id
  const response = await axios.delete(newUrl, config)
  return response.data
}

export default { setToken, getAll, create, update, deleteBlog }