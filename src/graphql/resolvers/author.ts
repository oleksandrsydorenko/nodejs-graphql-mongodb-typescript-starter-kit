export default {
  Query: {
    author: (_parent, { id }, { models }) => models.author.find(item => item.id === id),
    authors: (_parent, _args, { models }) => models.author,
  },

  Author: {
    books: (author, _args, { models }) => models.book.filter(item => item.authorId === author.id),
  },
};
