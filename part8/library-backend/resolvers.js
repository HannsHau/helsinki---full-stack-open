const { v1: uuid } = require('uuid')
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
      return book.save()
    },
    editAuthor: async (root, args) => {

      const author = await Author.findOne({ name: args.name})

      if (!author) {
        return null
      }

      author.born = args.born
      return author.save()
    }
  }
}

module.exports = resolvers
