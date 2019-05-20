export default {
  proxy: {
    '/todos/1': {
      changeOrigin: true,
      target: 'http://jsonplaceholder.typicode.com/',
    },
  },
};
