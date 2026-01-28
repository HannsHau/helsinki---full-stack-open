import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  const fetchPersons = () => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }

  useEffect(() => {
    fetchPersons()
  }, [])
  
  const prepareNotification = (text, error) => {
    setNotification({text: text, error: error})
    setTimeout(() => setNotification(null), 3000)
  }

  const addName = (event) => {
    event.preventDefault()

    const personFound = persons.find(person => person.name === newName)
    console.log(personFound)

    const personsObject = {
      name: newName,
      number: newNumber
    }

    if (personFound !== undefined) {
      personsObject.id = personFound.id
      if (confirm(`${personFound.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(personsObject)
          .then((returnedPerson) => {
            prepareNotification(`Number of ${personFound.name} is updated`, false)
            setPersons(persons.map(person => person.id === personFound.id ? returnedPerson : person))
          })
          .catch(() => {
            prepareNotification(`${personFound.name} was already removed from the server`, true)
            fetchPersons()
          })
      }
    } else {
      personsService
        .create(personsObject)
        .then((returnedPerson) => {
          prepareNotification(`Added ${returnedPerson.name}`, false)
          setPersons(persons.concat(returnedPerson))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    personsService
      .deletePerson(id)
      .then(() => {
        prepareNotification(`${person.name} is deleted`, false)
        setPersons(persons.filter(person => person.id !== id))
      })
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

  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      deletePerson(person.id)
    }

  }

  const personsToShow = filter.length > 0 
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

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

      <Persons persons={personsToShow} handleDelete={handleDelete}/>

    </div>
  )
}

export default App
