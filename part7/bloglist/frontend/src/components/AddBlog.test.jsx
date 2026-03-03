import { render, screen } from '@testing-library/react'
import AddBlog from './AddBlog'
import { input } from '@testing-library/user-event/dist/cjs/event/input.js'
import userEvent from '@testing-library/user-event'

describe('<AddBlog />', () => {

  test('check that handler recieves the right arguments', async () => {

    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<AddBlog createBlog={mockHandler}/>)

    // screen.debug()

    const title = screen.getByLabelText('title:')
    expect(title).toBeDefined()
    await user.type(title, 'Faust')

    const author = screen.getByLabelText('author:')
    expect(author).toBeDefined()
    await user.type(author, 'Goethe')

    const url = screen.getByLabelText('url:')
    expect(url).toBeDefined()
    await user.type(url, 'www.go.app')

    const createButton = screen.getByText('create')
    expect(createButton).toBeDefined()

    await user.click(createButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    //console.log(mockHandler.mock.calls)

    expect(mockHandler.mock.calls[0][0].title).toBe('Faust')
    expect(mockHandler.mock.calls[0][0].author).toBe('Goethe')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.go.app')
  })

})