import { useSelector } from 'react-redux'

const Notification = () => {

  const message = useSelector(state => state.message)

  const showMessage = message !== ''

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    visibility: showMessage ? 'visible' : 'hidden'
  }




  return <div style={style}>
      { message }
    </div>
}

export default Notification
