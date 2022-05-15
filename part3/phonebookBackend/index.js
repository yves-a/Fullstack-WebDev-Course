const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.use(express.json())
morgan.token('postBody', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.get('/', (request, response) => {
  response.send('<h1>Hello!</h1>')
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  const nameIncluded = persons.find(person=>person.name===body.name)
  console.log(nameIncluded)
  console.log(body.name)
  if (nameIncluded) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  const person = {
    id: getRandomInt(1000),
    name: body.name,
    number: body.number,
    
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/info', (request, response) => {
  let current = new Date()
  response.send('<p>Phonebook has info for '+persons.length+'</p>'+'<p>'+current+'</p>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})