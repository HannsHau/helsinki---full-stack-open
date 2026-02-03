
const Filter = (props) => {
  return (
    <div>
      {props.text}
      <input 
        onChange={props.onChange} value={props.filter} />
    </div>
  )
}
 export default Filter