module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/dash',
      handler: 'dash.lastVersion',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
