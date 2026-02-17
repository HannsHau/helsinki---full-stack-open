import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach } from 'vitest'

describe('<Blog />', () => {

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

  beforeEach(() => {
  
    const blog = {
      title: 'Bahamas!!!',
      author: 'DJ Bobo', 
      user: {username: 'Merz'},
      url: 'www.popo.de',
      likes: 3
    }

    const dummyUser = {
      username: 'No, No'
    }

    render(<Blog blog={blog} user={dummyUser}/>)

  })

  test('renders content', () => {

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

  test('display details', async () => {

    const url = screen.queryByText('www.popo.de')
    expect(url).toBeNull()

    const likes = screen.queryByText('likes')
    expect(likes).toBeNull()

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.debug()

    const newUrl = screen.getByText('www.popo.de')
    expect(newUrl).toBeDefined()

    const newLikes = screen.getByText('likes: 3')
    expect(newLikes).toBeDefined()

  })

})