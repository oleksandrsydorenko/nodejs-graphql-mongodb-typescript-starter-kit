const authorSchema: string = `
  extend type Query {
    author(name: String!): Author
    authors: [Author!]
  }

  extend type Mutation {
    createAuthor(name: String!): Author!
    deleteAuthor(name: String!): Author
    updateAuthor(name: String!, update: AuthorUpdateInput!): Author
  }

  input AuthorUpdateInput {
    name: String
  }

  type Author {
    id: ID!
    books: [Book!]
    name: String!
  }
`;

export default authorSchema;
