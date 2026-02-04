require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const Person = require('./models/person')


app.use(express.json())
app.use(express.static('dist'))

morgan.token('id', function getId (req) {
  return JSON.stringify(req.body)
})

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :id'))


app.get('/api/persons', (request, response) => {
  // response.json(persons)
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/info', (request, response) => {
  const entries = persons.length
  const time = new Date()
  response.send(`<p>Phonebook has info for ${entries} people</p><p>${time.toString()}</p>`)

})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  console.log('id:', id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const genId = Math.floor(Math.random() * 1_000_000_000)
  return String(genId)
}

app.post('/api/persons', (request, response) => {
  // console.log(request.headers)
  // console.log(request.body)
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name already exists, must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})