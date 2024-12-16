const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://backend:4000', // Nom du service Docker pour le backend
      changeOrigin: true,
    })
  );
};
