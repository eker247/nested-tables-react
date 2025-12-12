const { createProxyMiddleware } = require('http-proxy-middleware');

const target = process.env.REACT_APP_API_URL || 'http://localhost:3000';

module.exports = function (app) {
  // Proxy requests starting with /api -> target with path rewrite (/api/* -> /*)
  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
      secure: false,
    }),
  );

  // Proxy direct backend endpoints (no rewrite)
  const proxied = [
    '/DataFolders',
    '/DataFolder',
    '/DataFiles',
    '/DataFile',
    '/FileAttributes',
    '/FileAttribute',
    '/AttributeFilters',
    '/AttributeFilter',
  ];

  app.use(
    proxied,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
    }),
  );
};
