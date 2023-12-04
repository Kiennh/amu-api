module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/dash',
     handler: 'dash.exampleAction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
