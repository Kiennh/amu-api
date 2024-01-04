export default {
  routes: [
    {
     method: 'GET',
     path: '/report',
     handler: 'report.exampleAction',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
