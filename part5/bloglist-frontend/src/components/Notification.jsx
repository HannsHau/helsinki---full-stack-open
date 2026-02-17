const Notification = ({ notification }) => {

  if (notification === null) {
    return null
  }

  const type = notification.error ?  'error' : 'notification'

  return (
    <div className={type}>
      {notification.text}
    </div>
  )
}

export default Notification