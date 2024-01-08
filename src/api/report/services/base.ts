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

  protected named = (name) => {
    return this.query.then((response: any[]) => {
      const object = {};
      response.forEach(res => {
        object[res[name]] = res;
      })
      return {[name]: object}
    })
  }

}
