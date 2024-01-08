export default {
  routes: [
    {
      method: 'GET',
      path: '/report/summary',
      handler: 'report.summaryTable1',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/report/patientCharacteristicsTable2_1',
      handler: 'report.patientCharacteristicsTable2_1',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
