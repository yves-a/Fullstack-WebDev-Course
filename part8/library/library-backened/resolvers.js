const { UserInputError, AuthenticationError } = require('apollo-server')
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = process.env.JWT_SECRET
const insertAuthor = (books) => {
  return (updatedBooks = books.map(async (book) => {
    const foundAuthor = await Author.findById(book.author)
    return {
      title: book.title,
      author: foundAuthor,
      published: book.published,
      genres: book.genres,
    }
  }))
}

const getAuthorId = async (name) => {
  const authorName = await Author.findOne({ name: name })
  if (authorName) {
    return authorName._id
  }
  return null
}
const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genres) {
        const books = await Book.find({
          author: { $in: [await Author.findOne({ name: args.author })] },
          genres: { $in: args.genres },
        })
        return insertAuthor(books)
      } else if (args.author) {
        const books = await Book.find({
          author: { $in: [await Author.findOne({ name: args.author })] },
        })
        return insertAuthor(books)
      } else if (args.genres) {
        return insertAuthor(await Book.find({ genres: { $in: args.genres } }))
      }
      const books = await Book.find({})
      console.log(insertAuthor(books), 'books+au')
      return insertAuthor(books)
    },
    allAuthors: async () => await Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Author: {
    bookCount: async (root) => {
      return root.books.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
      let currentAuthor
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (author) {
        console.log(author.books)
        const authorId = await getAuthorId(args.author)
        console.log('id', authorId)
        currentAuthor = await Author.findById(authorId)
        console.log('curr')
      } else {
        currentAuthor = new Author({
          name: String(args.author),
        })

        try {
          await currentAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({ ...args, author: currentAuthor })
      try {
        await book.save()
        await currentAuthor.updateOne({ $push: { books: book } })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      console.log('woo')
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const authorId = await getAuthorId(args.name)
      if (authorId) {
        return await Author.findByIdAndUpdate(authorId, {
          born: args.setBornTo,
        })
      }

      return null
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}
module.exports = resolvers
