// require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))

morgan.token('postBody', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))

app.post('/api/persons', (request, response,next) => {
  const body = request.body
  console.log(body)

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const nameIncluded = persons.includes(person => person.name===body.name)
  console.log(persons)
  console.log(nameIncluded)
  console.log(body.name)
  if (nameIncluded) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  persons = persons.concat(person)
  console.log(persons)
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

let persons = [
]

app.get('/', (request, response) => {
  response.send('<h1>Hello!</h1>')
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response, next) => {
  let current = new Date()
  Person.estimatedDocumentCount({}).then(count => {
    const info = '<p>Phonebook has info for '+count+'</p>'+'<p>'+current+'</p>'
    response.send(info)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})