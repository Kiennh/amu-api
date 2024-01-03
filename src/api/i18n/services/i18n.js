'use strict';

/**
 * i18n service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::i18n.i18n');
