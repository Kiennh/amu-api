/**
 * A set of functions called "actions" for `report`
 */
const URL = require('node:url').URL;

export default {
  summaryTable1: async (ctx, next) => {
    const url = new URL(`https://${ctx.request.header.host}${ctx.request.url}`);
    try {
      const service: any = strapi.service('api::report.rest' as never);
      ctx.body = await service.summaryTable1(url.searchParams);
    } catch (err) {
      ctx.body = err;
    }
  },
  patientCharacteristicsTable2_1: async (ctx, next) => {
    const url = new URL(`https://${ctx.request.header.host}${ctx.request.url}`);
    try {
      const service: any = strapi.service('api::report.rest' as never);
      ctx.body = await service.patientCharacteristicsTable2_1(url.searchParams);
    } catch (err) {
      ctx.body = err;
    }
  },
  patientCharacteristicsTable2_2: async (ctx, next) => {
    const url = new URL(`https://${ctx.request.header.host}${ctx.request.url}`);
    try {
      const service: any = strapi.service('api::report.rest' as never);
      ctx.body = await service.patientCharacteristicsTable2_2(url.searchParams);
    } catch (err) {
      ctx.body = err;
    }
  },
  antibioticsTable4_1: async (ctx, next) => {
    const url = new URL(`https://${ctx.request.header.host}${ctx.request.url}`);
    try {
      const service: any = strapi.service('api::report.rest' as never);
      ctx.body = await service.antibioticsTable4_1(url.searchParams);
    } catch (err) {
      ctx.body = err;
    }
  },
  antibioticsTable4_2: async (ctx, next) => {
    const url = new URL(`https://${ctx.request.header.host}${ctx.request.url}`);
    try {
      const service: any = strapi.service('api::report.rest' as never);
      ctx.body = "{}";
    } catch (err) {
      ctx.body = err;
    }
  }
};
