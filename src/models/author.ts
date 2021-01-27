const authors = [
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

export default {
  findAll: () => authors,
  findById: id => authors.find(item => item.id === id) || null,
};
