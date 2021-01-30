let authors = [
  {
    id: '1',
    name: 'Fyodor Mikhailovich Dostoevsky',
    bookIds: ['3', '6'],
  },
  {
    id: '2',
    name: 'Lev Nikolaevich Tolstoy',
    bookIds: ['1', '8'],
  },
  {
    id: '3',
    name: 'Mikhail Afanasyevich Bulgakov',
    bookIds: ['7'],
  },
  {
    id: '4',
    name: 'William Cuthbert Faulkner',
    bookIds: ['2', '4', '5'],
  },
];

export type Author = {
  id: string;
  bookIds: string[];
  name: string;
};

export type AuthorResponse = Author | null;

export interface IAuthorModel {
  create: (name: string) => AuthorResponse;
  delete: (name: string) => boolean;
  findAll: () => Author[];
  findById: (id: string) => AuthorResponse;
  findByName: (name: string) => AuthorResponse;
  update: (name: string, data: { bookIds?: string[]; name?: string }) => AuthorResponse;
}

const AuthorModel: IAuthorModel = {
  create: name => {
    if (!authors.find(author => author.name === name)) {
      return null;
    }

    const newAuthor: Author = {
      bookIds: [],
      name,
      id: authors.reduce((acc, author) => Math.max(acc, parseInt(author.id, 10)), 1).toString(),
    };

    authors.push(newAuthor);

    return newAuthor;
  },
  delete: name => {
    const filteredAuthors: Author[] = authors.filter(author => author.name !== name);

    if (filteredAuthors.length === authors.length) {
      return false;
    }

    authors = filteredAuthors;

    return true;
  },
  findAll: () => authors,
  findById: id => authors.find(author => author.id === id) || null,
  findByName: name => authors.find(author => author.name === name) || null,
  update: (name, data) => {
    if (!data || !Object.keys(data).length) {
      return null;
    }

    let authorFromDb: AuthorResponse = null;

    authors.forEach(author => {
      if (author.name === name) {
        authorFromDb = {
          ...author,
          ...data,
        };
      }
    });

    return authorFromDb;
  },
};

export default AuthorModel;
