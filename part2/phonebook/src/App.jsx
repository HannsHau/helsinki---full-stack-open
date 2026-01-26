import { useState } from 'react'

const Person = ({person}) => <li>{person.name}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('check for: ', newName)

    const personFound = persons.filter( person => person.name === newName)

    if (personFound.length > 0) {
      alert(newName + ' is already added to phonebook')
    } else {
      const nameObject = { name: newName }
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App
