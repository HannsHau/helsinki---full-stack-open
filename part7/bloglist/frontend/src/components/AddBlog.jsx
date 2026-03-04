import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const AddBlog = ({ ref }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNew = async event => {
    event.preventDefault()

    const newBlog = { title, author, url }

    ref.current.toggleVisibility()
    dispatch(addBlog(newBlog))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleNew}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AddBlog
