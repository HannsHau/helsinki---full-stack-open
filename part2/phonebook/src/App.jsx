import { useState } from 'react'

const Person = ({person}) => <li>{person.name} {person.number}</li>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('check for: ', newName)

    const personFound = persons.filter( person => person.name === newName)

    if (personFound.length > 0) {
      alert(newName + ' is already added to phonebook')
    } else {
      const entry = { 
        name: newName, 
        number: newNumber, 
        id: persons.length + 1 }
      setPersons(persons.concat(entry))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter.length > 0 
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with
          <input 
            value={filter} 
            onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange} />
        </div>
        <div>
          number: 
          <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App
