const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  published: {
    type: Number,
    required: true,
  },
  genres: [{ type: String, required: true, minlength: 3 }],
})

module.exports = mongoose.model('Book', schema)
