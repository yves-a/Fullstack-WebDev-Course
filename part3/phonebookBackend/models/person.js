const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
  .then(
    console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        if (v.includes('-')){
          return v.replace(/[^0-9]/g,'').length >= 8 && (v.indexOf('-') === 2 || v.indexOf('-') === 3)
        }
        return v.length >= 8
      },
      message: props => `${props.value} is not a valid phone number!`,

    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)