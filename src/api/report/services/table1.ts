import {Knex} from "knex";

/**
 * report service
 */


export class AMUProcessor {
  private readonly name: string;
  private readonly connection: Knex;
  private readonly params: URLSearchParams;
  private query: Knex.QueryBuilder;

  constructor(connection: Knex, params: URLSearchParams) {
    this.name = 'AMUProcessor';
    this.connection = connection;
    this.params = params;
  }

  public hello() {
    return this.name
  }


  private filter() {
    this.query.where("medical_records.id", '>', '0')
    if (this.params.has("hospital")) {
      this.query.where("BENH_VIEN", "in", this.params.getAll("hospital"))
    }
    console.warn(this.query.toSQL());
    return this;
  }

  private named = (name) => {
    return this.query.then((response) => {
      return {[name]: response}
    })
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
      .from("medical_records")
      .where("type", 'in', ['BASE']);
    return this.filter().named("total");
  }

  public querySex() {
    // select count(distinct MS_BENH_NHAN) as number, gioi_tinh from patients group by gioi_tinh
    this.query = this.connection.select('gioi_tinh')
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .from("medical_records")
      .leftJoin('patients as p', function () {
        this.on('medical_records.MDD_BENH_NHAN', '=', 'p.MDD_BENH_NHAN');
      })
      .groupBy('gioi_tinh');

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
    this.query = this.connection.with('medical_records',
      this.connection.raw(`     select *,
                                       case
                                         when CO_PHAU_THUAT <> 'yes' then 'No surgery'
                                         when CO_PHAU_THUAT = 'yes' and LOAI_PHAU_THUAT_DA_THUC_HIEN = 'NHSN'
                                           then 'NHSN surgegy'
                                         else 'Non-NHSN surgegy' end as tx1
                                from medical_records
                                where type = 'BASE' `))
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

  public  queryCO_SD_KHANG_SINH = () => {
    return this.medicalQuery(["BASE"], "CO_SD_KHANG_SINH").named("CO_SD_KHANG_SINH")
  }

  static of(connection: Knex, params: URLSearchParams) {
    return new AMUProcessor(connection, params);
  }
}


