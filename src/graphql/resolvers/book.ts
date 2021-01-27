export default {
  Query: {
    book: (_parent, { id }, { models }) => models.Book.findById(id),
    books: (_parent, _args, { models }) => models.Book.findAll(),
  },

  Book: {
    author: (book, _args, { models }) => models.Author.findById(book.authorId),
  },
};
