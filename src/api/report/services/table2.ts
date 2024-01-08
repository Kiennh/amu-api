import {Knex} from "knex";

/**
 * report service
 */


export class AMUPatientCharacteristic  {
  private readonly name: string;
  private readonly connection: Knex;
  private readonly params: URLSearchParams;
  private query: Knex.QueryBuilder;

  constructor(connection: Knex, params: URLSearchParams) {
    this.name = 'AMUSummary';
    this.connection = connection;
    this.params = params;
  }
}
