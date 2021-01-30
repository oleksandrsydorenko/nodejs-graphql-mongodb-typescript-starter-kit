export default `
  extend type Query {
    author(name: String!): Author
    authors: [Author!]
  }

  extend type Mutation {
    createAuthor(name: String!): Author
    deleteAuthor(name: String!): Boolean!
    updateAuthor(name: String!, data: UpdateAuthorInput!): Author
  }

  input UpdateAuthorInput {
    name: String
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]
  }
`;
