import {AMUSummary} from './AMUSummary'
import {AMUPatientCharacteristic} from "./AMUPatientCharacteristic";
import {AMUAntibiotics} from "./AMUAntibiotics";


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
  antibioticsTable4_1: async (params: URLSearchParams) => {
    const connection = strapi.db.connection;
    return Promise.all([
      AMUAntibiotics.of(connection, params).queryKHANG_SINH(),
      AMUAntibiotics.of(connection, params).queryNHOM_KHANG_SINH(),
      AMUAntibiotics.of(connection, params).querySD_KHANG_SINH(),
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
  antibioticsTable4_2: async (params: URLSearchParams) => {
    const connection = strapi.db.connection;
    return Promise.all([
      AMUAntibiotics.of(connection, params).queryWHO_AWARE(),
    ]).then(results => {
      const object = []
      results.forEach(data => {
        Object.keys(data).forEach(key => {
          object.push({id: key, ...data[key]})
        })
      })
      return {"data": object, "meta": {"pagination": {"total": object.length}}};
    });
  },
  patientCharacteristicsTable2_1: async (params: URLSearchParams) => {
    const connection = strapi.db.connection;
    return Promise.all([
      AMUPatientCharacteristic.of(connection, params).queryWardTypePrevalenceAntibioticUse(),
    ]).then(results => {
      const object = []
      results.forEach(data => {
        Object.keys(data).forEach(key => {
          object.push({id: key, ...data[key]})
        })
      })
      return {"data": object, "meta": {"pagination": {"total": object.length}}};
    })
  },
  patientCharacteristicsTable2_2: async (params: URLSearchParams) => {
    const connection = strapi.db.connection;
    return Promise.all([
      AMUPatientCharacteristic.of(connection, params).queryWardTypePrevalenceAntibioticUseByAge(),
    ]).then(results => {
      const object = []
      results.forEach(data => {
        Object.keys(data).forEach(key => {
          object.push({id: key, ...data[key]})
        })
      })
      return {"data": object, "meta": {"pagination": {"total": object.length}}};
    })
  }
});
