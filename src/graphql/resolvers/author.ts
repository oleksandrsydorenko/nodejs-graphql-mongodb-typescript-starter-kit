export default {
  Query: {
    author: (_parent, { id }, { models }) => models.Author.findById(id),
    authors: (_parent, _args, { models }) => models.Author.findAll(),
  },

  Author: {
    books: (author, _args, { models }) => models.Book.filterByAuthorId(author.id),
  },
};
