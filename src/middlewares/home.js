'use strict';

/**
 * `home` middleware
 */
const path = require('path');
const koaStatic = require('koa-static');


module.exports = (config, {strapi}) => {
  const serveIndexPage = async (ctx, next) => {
    // defer rendering of strapi index page
    await next();

    if (ctx.body != null || ctx.status !== 404) return;
    console.warn(ctx.url)
    ctx.url = 'index.html';
    const body = "";

    // Serve static.
    ctx.type = 'html';
    ctx.body = body;
  };

  // Add your own logic here.
  return async (ctx, next) => {
    strapi.server.routes([
      {
        method: 'GET',
        path: '/',
        handler: koaStatic("./public"),
        config: {auth: false},
      },
      {
        method: 'GET',
        path: '/manifest.json',
        handler: koaStatic("./public"),
        config: {auth: false},
      },
      {
        method: 'GET',
        path: '/assets/(.*)',
        handler: koaStatic("./public/", {defer: true}),
        config: {auth: false},
      }
    ]);

    await next();
  };
};
