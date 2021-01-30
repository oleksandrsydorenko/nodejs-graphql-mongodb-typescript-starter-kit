let books = [
  {
    id: '1',
    authorId: '2',
    title: 'Anna Karenina',
  },
  {
    id: '2',
    authorId: '4',
    title: 'As I Lay Dying',
  },
  {
    id: '3',
    authorId: '1',
    title: 'Crime and Punishment',
  },
  {
    id: '4',
    authorId: '4',
    title: 'Go Down, Moses',
  },
  {
    id: '5',
    authorId: '4',
    title: 'Light in August',
  },
  {
    id: '6',
    authorId: '1',
    title: 'The Idiot',
  },
  {
    id: '7',
    authorId: '3',
    title: 'The Master and Margarita',
  },
  {
    id: '8',
    authorId: '2',
    title: 'War and Peace',
  },
];

export type Book = {
  id: string;
  authorId: string;
  title: string;
};

export type BookResponse = Book | null;

export interface IBookModel {
  create: (titles: string, author: string) => BookResponse;
  delete: (title: string) => boolean;
  deleteByAuthorId: (authorId: string) => boolean;
  filterByAuthorId: (authorId: string) => Book[];
  findAll: () => Book[];
  findById: (id: string) => BookResponse;
  findByTitle: (title: string) => BookResponse;
  update: (title: string, data: { author?: string; title?: string }) => BookResponse;
}

const BookModel: IBookModel = {
  create: (title, authorId) => {
    if (books.find(book => book.title === title)) {
      return null;
    }

    const newBook: Book = {
      authorId,
      title,
      id: books.reduce((acc, book) => Math.max(parseInt(book.id, 10), acc), 1).toString(),
    };

    books.push(newBook);

    return newBook;
  },
  delete: title => {
    const filteredBooks: Book[] = books.filter(book => book.title !== title);

    if (filteredBooks.length === books.length) {
      return false;
    }

    books = filteredBooks;

    return true;
  },
  deleteByAuthorId: authorId => {
    const filteredBooks: Book[] = books.filter(book => book.authorId !== authorId);

    if (filteredBooks.length === books.length) {
      return false;
    }

    books = filteredBooks;

    return true;
  },
  filterByAuthorId: authorId => books.filter(book => book.authorId === authorId),
  findAll: () => books,
  findById: id => books.find(book => book.id === id) || null,
  findByTitle: title => books.find(book => book.title === title) || null,
  update: (title, data) => {
    if (!data || !Object.keys(data).length) {
      return null;
    }

    let bookFromDb: BookResponse = null;

    books.forEach(book => {
      if (book.title === title) {
        bookFromDb = {
          ...book,
          ...data,
        };
      }
    });

    return bookFromDb;
  },
};

export default BookModel;
