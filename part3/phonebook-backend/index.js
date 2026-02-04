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

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :id'))

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const entries = persons.length
  const time = new Date()
  response.send(`<p>Phonebook has info for ${entries} people</p><p>${time.toString()}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return next('NameMissing')
  } else if (!body.number) {
    return next('NumberMissing')
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })  
  .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {

  console.log('Error: ', error)


  if (error === 'NameMissing') {
    return response.status(400).send({ error: 'name missing' })
  }
  if (error === 'NumberMissing') {
    return response.status(400).send({ error: 'Number is missing' })
  } 
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})