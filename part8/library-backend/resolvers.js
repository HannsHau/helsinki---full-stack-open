const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, {author, genre}) => {

      const filter = {}
      if (genre) {
        filter.genres = { $in: [genre] }
      }
      if (author) {
        const authorFound = await Author.findOne({ name: author})
        if (authorFound) {
          filter.author = authorFound._id
        } else {
          return []
        }
      }

      return Book.find(filter).populate('author')
    },
    allAuthors: async (root, args) => Author.find({})
  },
  Author: {
    bookCount: async ({name}) => {
      const authorFound = await Author.findOne({ name: name})

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
    addBook: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.author})

      if (!authorExists) {
        const author = new Author({ name: args.author})
        const savedAuthor = await author.save()

        const book = new Book({ ...args, author: savedAuthor})
        return book.save()
      }

      const book = new Book({ ...args, author: authorExists})
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
 
      return book
    },
    editAuthor: async (root, args) => {

      const author = await Author.findOne({ name: args.name})

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
    }
  }
}

module.exports = resolvers
