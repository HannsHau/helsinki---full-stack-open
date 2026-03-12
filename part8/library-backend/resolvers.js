const { GraphQLError, subscribe } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      const filter = {}
      if (genre) {
        filter.genres = { $in: [genre] }
      }
      if (author) {
        const authorFound = await Author.findOne({ name: author })
        if (authorFound) {
          filter.author = authorFound._id
        } else {
          return []
        }
      }

      return Book.find(filter).populate('author')
    },
    allAuthors: async (root, args) => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async ({ name }) => {
      const authorFound = await Author.findOne({ name: name })

      const filter = {}
      if (authorFound) {
        filter.author = authorFound._id
      } else {
        return []
      }

      const found = await Book.find(filter)
      return found.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      const authorExists = await Author.findOne({ name: args.author })

      if (!authorExists) {
        const author = new Author({ name: args.author })
        const savedAuthor = await author.save()

        const book = new Book({ ...args, author: savedAuthor })
        return book.save()
      }

      const book = new Book({ ...args, author: authorExists })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.born
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Modifing author failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.born,
            error
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save().catch(error => {
        throw new GraphQLError(`Creating the user failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  }
}

module.exports = resolvers
