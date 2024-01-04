'use strict';

/**
 * dash service
 */

module.exports = {
  lastVersion: async (params) => {
    return new Promise((resole, reject) => {
      strapi.db.connection.raw('select name from versions order by id desc limit 1').then(resp => {
        return resole(resp);
      }).catch(error => {
        reject(error)
      });
    });
  },

  firstVersion: async (params) => {
    return new Promise((resole, reject) => {
      strapi.db.connection.raw('select name from versions order by id limit 1').then(resp => {
        return resole(resp);
      }).catch(error => {
        reject(error)
      });
    });
  }
}
