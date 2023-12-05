'use strict';

/**
 * A set of functions called "actions" for `dash`
 */

module.exports = {
  lastVersion: async (ctx, next) => {
    try {
      const data = await strapi.service('api::dash.dash').lastVersion();
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
