import {AMUProcessor} from './table1'


export default () => ({
  execute: async (params: URLSearchParams) => {
    const connection = strapi.db.connection;
    return Promise.all([
      AMUProcessor.of(connection, params).querySex(),
      AMUProcessor.of(connection, params).queryTotal(),
      AMUProcessor.of(connection, params).queryAgeGroup(),
      AMUProcessor.of(connection, params).queryPHAU_THUAT(),
      AMUProcessor.of(connection, params).queryCO_CATHETER_TRUNG_TAM(),
      AMUProcessor.of(connection, params).queryCO_THONG_TIEU(),
      AMUProcessor.of(connection, params).queryCO_NOI_KHI_QUAN(),
      AMUProcessor.of(connection, params).queryCO_SD_KHANG_SINH(),
      AMUProcessor.of(connection, params).queryNHOM_NGAY_NAM_VIEN()
    ]).then(results => {
      const object = {"id": 0}// for strapi
      results.forEach(data => {
        Object.keys(data).forEach(key => {
          object[key] = data[key]
        })
      })
      return {"data": [object], "meta": {"pagination": {"total": 1}}};
    })
  }
});