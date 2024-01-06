/**
 * A set of functions called "actions" for `report`
 */
const URL = require('node:url').URL;

export default {
  exampleAction: async (ctx, next) => {
    const url = new URL(`https://${ctx.request.header.host}${ctx.request.url}`);
    try {
      const service: any = strapi.service('api::report.rest' as never);
      ctx.body = await service.execute(url.searchParams);
    } catch (err) {
      ctx.body = err;
    }
  }
};
