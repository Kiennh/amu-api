'use strict';

/**
 * organism service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::organism.organism');
