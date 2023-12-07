'use strict';

/**
 * antibiotic service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::antibiotic.antibiotic');
