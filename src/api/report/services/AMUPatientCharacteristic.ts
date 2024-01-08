import {Knex} from "knex";
import {Base} from "./base";

/**
 * report service
 */


export class AMUPatientCharacteristic extends Base {

  constructor(connection: Knex, params: URLSearchParams) {
    super(connection, params);
  }


  public queryWardTypePrevalenceAntibioticUse = () => {
    this.query = this.connection
      .with('total',
        this.connection.raw(`select h.name,
                                    case when d.type is null then 'None' else d.type end as type,
                                    sum(so_benh_nhan)                                    as so_benh_nhan,
                                    sum(so_benh_nhan_hop_le)                             as so_benh_nhan_hop_le,
                                    sum(so_benh_nhan_khao_sat)                           as so_benh_nhan_khao_sat
                             from hospital_details h
                                    left join departments d
                                              on h.LOAI_BENH_PHONG = d.ward_type_code
                             group by h.name, case when d.type is null then 'None' else d.type end`)
      ).with('t2',
        this.connection.raw(` select count(*)                                             as benh_nhan_sd_khang_sinh,
                                     case when d.type is null then 'None' else d.type end as type
                              from medical_records m
                                     left join departments d
                                               on m.MDD_BENH_PHONG = d.ward_type_code
                              where m.type = 'KHANG_SINH'
                                and ten_hoat_chat_ks <> ''
                              group by case when d.type is null then 'None' else d.type end`)
      ).select(this.connection.raw(`total.*, t2.benh_nhan_sd_khang_sinh`))
      .from('total')
      .join('t2', function () {
        this.on('total.type', '=', 't2.type');
      })
      .where('t2.type', '<>', 'None')
      .orderBy("name");

    return this.query;
  }

  public queryWardTypePrevalenceAntibioticUseByAge = () => {
    this.query = this.connection.with('t1',
      this.connection
        .countDistinct('medical_records.MS_BENH_NHAN as number')
        .select('NHOM_TUOI')
        .from("medical_records")
        .where("type", 'in', ['BASE'])
        .groupBy('NHOM_TUOI')
    )
      .with('t2',
        this.connection
          .countDistinct('medical_records.MS_BENH_NHAN as number_use_antibiotics')
          .select('NHOM_TUOI')
          .from("medical_records")
          .where("type", 'in', ['KHANG_SINH'])
          .andWhere("ten_hoat_chat_ks", '<>', '')
          .groupBy('NHOM_TUOI')
      ).select(this.connection.raw(`*`))
      .from('t1')
      .leftJoin('t2', function () {
        this.on('t1.NHOM_TUOI', '=', 't2.NHOM_TUOI');
      });
    console.warn(this.query.toSQL());
    return this.query;
  }

  static of(connection: Knex<any, any[]>, params: URLSearchParams) {
    return new AMUPatientCharacteristic(connection, params);
  }
}
