export default {
  Query: {
    author: () => {
      return {
        name: 'Mikhail Bulgakov',
        books: [
          {
            author: {
              name: 'Mikhail Bulgakov',
            },
            title: 'The Master and Margarita',
          },
        ],
      };
    },
  },
};
