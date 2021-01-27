const books = [
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

export default {
  filterByAuthorId: authorId => books.filter(book => book.authorId === authorId),
  findAll: () => books,
  findById: id => books.find(book => book.id === id) || null,
};
