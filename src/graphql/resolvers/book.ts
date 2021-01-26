export default {
  Query: {
    book: (_parent, { id }, { models }) => models.book.find(item => item.id === id),
    books: (_parent, _args, { models }) => models.book,
  },

  Book: {
    author: (book, _args, { models }) => models.author.find(item => item.id === book.authorId),
  },
};
