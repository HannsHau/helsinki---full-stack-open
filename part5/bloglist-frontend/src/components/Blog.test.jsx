import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {

//   const Blog = ({ blog, user, changeBlog, removeBlog }) => {
//   <Blog key={blog.id} blog={blog} user={user} changeBlog={modifyBlog} removeBlog={removeBlog} />
//   const blogSchema = new mongoose.Schema({
//   title: { type: String, required: [true, ]},
//   author: String,
//   url: { type: String, required: true},
//   likes: { type: Number, default: 0},
//   user : {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }
// })

  const blog = {
    title: 'Bahamas!!!',
    author: 'DJ Bobo', 
    user: {username: 'Merz'},
    url: 'www.popo.de',
    likes: 3
  }

  const user = {
    username: 'No, No'
  }

  render(<Blog blog={blog} user={user}/>)

  //screen.debug()

  const title = screen.queryByText('Bahamas!!!')
  expect(title).toBeDefined()

  const author = screen.queryByText('DJ Bobo')
  expect(author).toBeDefined()

  const url = screen.queryByText('www.popo.de')
  expect(url).toBeNull()

  const likes = screen.queryByText('likes')
  expect(likes).toBeNull()

})