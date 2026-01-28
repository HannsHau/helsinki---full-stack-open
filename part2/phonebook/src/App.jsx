import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  

  const addName = (event) => {
    event.preventDefault()

    const personFound = persons.filter( person => person.name === newName)

    if (personFound.length > 0) {
      alert(newName + ' is already added to phonebook')
    } else {
      // const entry = { 
      //   name: newName, 
      //   number: newNumber, 
      //   id: persons.length + 1 }
      // setPersons(persons.concat(entry))
      const entry = {
        name: newName,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', entry)
        .then(response => {
          console.log('promise fulfilled')
          setPersons(persons.concat(response.data))
        })
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
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = filter.length > 0 
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={(event) => handleFilterChange(event)} text="filter shown with" value={filter} />

      <h3>add a new</h3>

      <PersonForm 
        addName={(event) => addName(event)} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />

    </div>
  )
}

export default App
