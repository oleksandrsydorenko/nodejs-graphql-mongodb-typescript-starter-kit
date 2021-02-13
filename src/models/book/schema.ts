const bookSchema: string = `
  extend type Query {
    book(title: String!): Book
    books: [Book!] @cacheControl(maxAge: 5)
  }

  extend type Mutation {
    createBook(title: String!, author: String!): Book!
    deleteBook(title: String!): Book
    updateBook(title: String!, data: UpdateBookInput!): Book
  }

  input UpdateBookInput {
    title: String
  }

  type Book {
    id: ID!
    author: Author!
    title: String!
  }
`;

export default bookSchema;
