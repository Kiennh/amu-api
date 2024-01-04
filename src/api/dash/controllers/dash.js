'use strict';

/**
 * A set of functions called "actions" for `dash`
 */
const URL = require('node:url').URL;

module.exports = {
  lastVersion: async (ctx, next) => {
    const service = strapi.service('api::dash.dash');
    const url = new URL(`https://${ctx.request.header.host}${ctx.request.url}`);
    try {
      ctx.body = await Promise.all([
        service.lastVersion(url.searchParams),
        service.firstVersion(url.searchParams),
      ]);
    } catch (err) {
      ctx.body = err;
    }
  }
};
