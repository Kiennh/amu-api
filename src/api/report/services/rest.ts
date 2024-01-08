import {AMUSummary} from './AMUSummary'


export default () => ({
  summaryTable1: async (params: URLSearchParams) => {
    const connection = strapi.db.connection;
    return Promise.all([
      AMUSummary.of(connection, params).querySex(),
      AMUSummary.of(connection, params).queryTotal(),
      AMUSummary.of(connection, params).queryAgeGroup(),
      AMUSummary.of(connection, params).queryPHAU_THUAT(),
      AMUSummary.of(connection, params).queryCO_CATHETER_TRUNG_TAM(),
      AMUSummary.of(connection, params).queryCO_THONG_TIEU(),
      AMUSummary.of(connection, params).queryCO_NOI_KHI_QUAN(),
      AMUSummary.of(connection, params).queryCO_SD_KHANG_SINH(),
      AMUSummary.of(connection, params).queryNHOM_NGAY_NAM_VIEN()
    ]).then(results => {
      const object = {"id": 0}// for strapi
      results.forEach(data => {
        Object.keys(data).forEach(key => {
          object[key] = data[key]
        })
      })
      return {"data": [object], "meta": {"pagination": {"total": 1}}};
    })
  },
  patientCharacteristicsTable2_1: async (params: URLSearchParams) => {
    const connection = strapi.db.connection;
  }
});
