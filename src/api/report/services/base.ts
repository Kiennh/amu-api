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

  protected filterQuery(qs: Knex.QueryBuilder, table = '') {
    if (this.params.has("filters[hospital][$eq]")) {
      console.warn(this.params.getAll("filters[hospital][$eq]"))
      qs.where(`${table}BENH_VIEN`, "in", this.params.getAll("filters[hospital][$eq]"))
    }
    console.warn(qs.toSQL());
    return qs;
  }

  protected filter(table = '') {
    this.filterQuery(this.query, table);
    return this;
  }

}
