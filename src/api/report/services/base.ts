import {Knex} from "knex";

export class Base {
  protected name: string;
  protected readonly connection: Knex;
  protected readonly params: URLSearchParams;
  protected query: Knex.QueryBuilder;

  constructor(connection: Knex, params: URLSearchParams) {
    this.name = 'Base';
    this.connection = connection;
    this.params = params;
  }

  public hello() {
    return this.name
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

  protected filterQuery(qs: Knex.QueryBuilder, table = '') {
    if (this.params.has("filters[hospital][$eq]")) {
      console.warn(this.params.getAll("filters[hospital][$eq]"))
      qs.where(`${table}BENH_VIEN`, "in", this.params.getAll("filters[hospital][$eq]"))
    }
    if (this.params.has("filters[age][$eq]")) {
      console.warn(this.params.getAll("filters[hospital][$eq]"))
      qs.where(`${table}NHOM_TUOI`, "in", this.params.getAll("filters[age][$eq]"))
    }
    console.warn(qs.toSQL());
    return qs;
  }

  protected filter(table = '') {
    this.filterQuery(this.query, table);
    return this;
  }

}
