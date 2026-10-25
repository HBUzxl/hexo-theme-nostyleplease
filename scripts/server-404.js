'use strict';

// 开发服务器（hexo server）下，未匹配的页面返回统一 404.html，而不是 Cannot GET
// 生产环境由静态托管服务直接使用生成的 404.html
hexo.extend.filter.register('server_middleware', function (app) {
  app.use(function (req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (!/text\/html/.test(req.headers.accept || '')) return next();
    var page = hexo.route.get('404.html');
    if (!page) return next();
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    page.pipe(res).on('error', next);
  });
}, 99);
