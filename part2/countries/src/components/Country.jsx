

const Country = ({countries, handleShow}) => {

  if (countries.length > 10) {
    return (<p>Too many matches, specify another filter</p>)
  } 

  return <>
    <p>Countries ({countries.length}): </p>
    {countries.map(element => <li key={element}>{element} <button onClick={() => handleShow(element)} >Show</button></li>)}
  </>
}

export default Country