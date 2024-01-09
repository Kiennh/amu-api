import {Base} from "./base";
import {Knex} from "knex";


export class AMUTreatments extends Base {

  // 3.2
  // select count(distinct MS_BENH_NHAN) as number, KET_QUA_NUOI_CAY
  // from medical_records where type = 'VI_SINH'
  // group by KET_QUA_NUOI_CAY

  //administration_routes
  static of(connection: Knex, params: URLSearchParams) {
    return new AMUTreatments(connection, params);
  }
}
