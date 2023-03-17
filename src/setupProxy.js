const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/200',
    createProxyMiddleware({
      target: 'http://dummyimage.com',
      changeOrigin: true,
    })
  );
};