const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://yalikalfic:${password}@cluster0.uywcy.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
  id: Math.floor(Math.random() * 1000),
  name: name,
  number: number
})

person.save().then(result => {
  console.log('added '+name+' number '+number+' to phonebook')
  console.log('phonebook:')
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person.name +' '+ person.number)
    })
    mongoose.connection.close()
  })
  console.log(result)
})

