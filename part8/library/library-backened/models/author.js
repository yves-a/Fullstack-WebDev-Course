const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
  },
  born: {
    type: Number,
    minlength: 1,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  bookCount: {
    type: Number,
  },
})

module.exports = mongoose.model('Author', schema)
