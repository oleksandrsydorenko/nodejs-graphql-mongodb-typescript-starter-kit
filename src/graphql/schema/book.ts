export default `
  extend type Query {
    book(id: ID!): Book
    books: [Book!]
  }

  type Book {
    id: ID!
    author: Author!
    title: String!
  }
`;
