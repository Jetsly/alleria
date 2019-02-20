export default {
  proxy: {
    '/todos/1': {
      target: 'http://jsonplaceholder.typicode.com/',
    },
  },
};
