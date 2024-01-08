import {Base} from "./base";
import {Knex} from "knex";


export class AMUAntibiotics extends Base {

  public queryNHOM_KHANG_SINH() {
    // select count(distinct MS_BENH_NHAN) as number, a.variable_3 as class
    // from medical_records m join antibiotics a
    // on m.type = 'KHANG_SINH' and m.TEN_HOAT_CHAT_KS = a.name
    // group by a.variable_3

    this.query = this.connection
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select(this.connection.raw(`antibiotics.variable_3 as class`))
      .from("medical_records").leftJoin("antibiotics", function () {
        this.on('medical_records.TEN_HOAT_CHAT_KS', '=', 'antibiotics.name')
          .andOnVal('medical_records.TEN_HOAT_CHAT_KS', '<>', '')
          .andOnVal('medical_records.type', '=', 'KHANG_SINH');
      })
      .where("type", 'in', ['KHANG_SINH'])
      .groupBy('antibiotics.variable_3');
    console.warn(this.query.toSQL());
    return this.filter('medical_records.').named("NHOM_KHANG_SINH");
  }

  public querySD_KHANG_SINH() {
    //   select count(distinct MS_BENH_NHAN) as number,
    // case when a.id > 0 then 'Use Antibiotic' else 'Not Use Antibiotic' end as antibiotic_use
    //   from medical_records m left join antibiotics a
    //   on m.type = 'KHANG_SINH'
    //   and m.TEN_HOAT_CHAT_KS <> ''
    //   and m.TEN_HOAT_CHAT_KS = a.name
    //   group by case when a.id > 0 then 'Use Antibiotic' else 'Not Use Antibiotic' end

    this.query = this.connection
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select(this.connection.raw(`case when medical_records.id > 0 then 'Use Antibiotic' else 'Not Use Antibiotic' end as antibiotic_use`))
      .from("medical_records")
      .leftJoin("antibiotics", function () {
        this.on('medical_records.TEN_HOAT_CHAT_KS', '=', 'antibiotics.name')
          .andOnVal('medical_records.TEN_HOAT_CHAT_KS', '<>', '')
          .andOnVal('medical_records.type', '=', 'KHANG_SINH');
      })
      .groupByRaw(`case when medical_records.id > 0 then 'Use Antibiotic' else 'Not Use Antibiotic' end`);
    console.warn(this.query.toSQL());
    return this.filter('medical_records.').named("SD_KHANG_SINH");
  }

  public queryKHANG_SINH() {
    // select count(distinct MS_BENH_NHAN) as number, a.variable_3 as class, a.name as name
    // from medical_records m join antibiotics a
    // on m.type = 'KHANG_SINH' and m.TEN_HOAT_CHAT_KS = a.name
    // group by a.variable_3, a.name
    this.query = this.connection
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select(this.connection.raw(`antibiotics.variable_3 as class, antibiotics.name as name`))
      .from("medical_records")
      .leftJoin("antibiotics", function () {
        this.on('medical_records.TEN_HOAT_CHAT_KS', '=', 'antibiotics.name')
          .andOnVal('medical_records.TEN_HOAT_CHAT_KS', '<>', '')
          .andOnVal('medical_records.type', '=', 'KHANG_SINH');
      })
      .groupByRaw('antibiotics.variable_3, antibiotics.name');

    console.warn(this.query.toSQL());
    return this.filter('medical_records.').named("KHANG_SINH");
  }

  public queryWHO_AWARE() {
    // select count(distinct MS_BENH_NHAN) as number, a.variable_3 as class, a.name as name
    // from medical_records m join antibiotics a
    // on m.type = 'KHANG_SINH' and m.TEN_HOAT_CHAT_KS = a.name
    // group by a.variable_3, a.name
    this.query = this.connection
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select(this.connection.raw(`antibiotics.who_aware as who_aware`))
      .from("medical_records")
      .leftJoin("antibiotics", function () {
        this.on('medical_records.TEN_HOAT_CHAT_KS', '=', 'antibiotics.name')
          .andOnVal('medical_records.TEN_HOAT_CHAT_KS', '<>', '')
          .andOnVal('medical_records.type', '=', 'KHANG_SINH');
      })
      .where("antibiotics.who_aware", "is not", null)
      .groupByRaw('antibiotics.who_aware');

    console.warn(this.query.toSQL());
    return this.filter('medical_records.').query;
  }


  protected named = (name) => {
    return this.query.then((response: any[]) => {
      return {[name]: response}
    })
  }


  static of(connection: Knex, params: URLSearchParams) {
    return new AMUAntibiotics(connection, params);
  }
}
