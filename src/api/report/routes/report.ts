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
    {
      method: 'GET',
      path: '/report/patientCharacteristicsTable2_2',
      handler: 'report.patientCharacteristicsTable2_2',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/report/antibioticsTable4_1',
      handler: 'report.antibioticsTable4_1',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/report/antibioticsTable4_2',
      handler: 'report.antibioticsTable4_2',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
