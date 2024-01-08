import {Knex} from "knex";
import {Base} from "./base";

/**
 * report service
 */


export class AMUSummary extends Base {

  constructor(connection: Knex, params: URLSearchParams) {
    super(connection, params);
    this.name = 'AMUSummary';
  }


  private filter() {
    this.query.where("medical_records.id", '>', '0')
    if (this.params.has("filters[hospital][$eq]")) {
      console.warn(this.params.getAll("filters[hospital][$eq]"))
      this.query.where("BENH_VIEN", "in", this.params.getAll("filters[hospital][$eq]"))
    }
    console.warn(this.query.toSQL());
    return this;
  }

  public medicalQuery(type: any, fields: string) {
    // select count(distinct MDD_BENH_NHAN) as number, 'medicals' as label   from medical_records where type = 'BASE'
    this.query = this.connection
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select(fields)
      .from("medical_records")
      .where("type", 'in', type)
      .groupBy(fields);

    return this.filter();
  }

  public queryTotal() {
    // select count(distinct MDD_BENH_NHAN) as number, 'medicals' as label   from medical_records where type = 'BASE'
    this.query = this.connection
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select(this.connection.raw(`'total' as "total"`))
      .from("medical_records")
      .where("type", 'in', ['BASE']);
    return this.filter().named("total");
  }

  public querySex() {
    // select count(distinct MS_BENH_NHAN) as number, gioi_tinh from patients group by gioi_tinh
    this.query = this.connection
      .select('GIOI_TINH')
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .from("medical_records")
      .join('patients as p', function () {
        this.on('medical_records.MDD_BENH_NHAN', '=', 'p.MDD_BENH_NHAN');
      })
      .groupBy('GIOI_TINH');

    return this.filter().named("GIOI_TINH");
  }


//   select count(distinct MS_BENH_NHAN) as number, type
  //   from (
  //     select MS_BENH_NHAN,
  //   case
  //   when CO_PHAU_THUAT <> 'yes' then 'No surgery'
  //   when CO_PHAU_THUAT = 'yes' and LOAI_PHAU_THUAT_DA_THUC_HIEN = 'NHSN' then 'NHSN surgegy'
  //   else 'Non-NHSN surgegy' end as type
  //   from medical_records where type = 'BASE'
// ) a
//   group by type

  public queryPHAU_THUAT = () => {
    this.query = this.connection
      .with('medical_records',
        this.connection.raw(`     select *,
                                         case
                                           when CO_PHAU_THUAT <> 'yes' then 'No surgery'
                                           when CO_PHAU_THUAT = 'yes' and LOAI_PHAU_THUAT_DA_THUC_HIEN = 'NHSN'
                                             then 'NHSN surgegy'
                                           else 'Non-NHSN surgegy' end as tx1
                                  from medical_records
                                  where type = 'BASE' `)
      )
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select('tx1 as PHAU_THUAT')
      .from('medical_records')
      .groupBy('tx1');

    return this.filter().named("PHAU_THUAT");
  }

  public queryAgeGroup = () => {
    return this.medicalQuery(["BASE"], "NHOM_TUOI").named("NHOM_TUOI")
  }

  public queryCO_CATHETER_TRUNG_TAM = () => {
    return this.medicalQuery(["BASE"], "CO_CATHETER_TRUNG_TAM").named("CO_CATHETER_TRUNG_TAM")
  }

  public queryCO_THONG_TIEU = () => {
    return this.medicalQuery(["BASE"], "CO_THONG_TIEU").named("CO_THONG_TIEU")
  }

  public queryCO_NOI_KHI_QUAN = () => {
    return this.medicalQuery(["BASE"], "CO_NOI_KHI_QUAN").named("CO_NOI_KHI_QUAN")
  }

  public queryCO_SD_KHANG_SINH = () => {
    return this.medicalQuery(["BASE"], "CO_SD_KHANG_SINH").named("CO_SD_KHANG_SINH")
  }

  public queryNHOM_NGAY_NAM_VIEN = () => {
    return this.medicalQuery(["BASE"], "NHOM_NGAY_NAM_VIEN").named("NHOM_NGAY_NAM_VIEN")
  }

  static of(connection: Knex, params: URLSearchParams) {
    return new AMUSummary(connection, params);
  }
}


