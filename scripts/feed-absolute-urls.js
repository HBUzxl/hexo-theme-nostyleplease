'use strict';

// 订阅器在站外渲染内容：补全相对地址，并去掉只对浏览器有意义的图片属性
hexo.extend.filter.register('after_generate', function () {
  const base = (this.config.url || '').replace(/\/+$/, '');
  if (!base) return;

  const routes = this.route.list().filter((path) => path.endsWith('.xml'));

  return Promise.all(routes.map((path) => new Promise((resolve) => {
    const stream = this.route.get(path);
    if (!stream) return resolve();

    const chunks = [];
    stream.on('error', resolve);
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => {
      const text = Buffer.concat(chunks)
        .toString('utf8')
        .replace(/\sloading="lazy"/g, '')
        .replace(/\sdecoding="async"/g, '')
        .replace(/(src|href)="\/(?!\/)/g, `$1="${base}/`);

      this.route.set(path, text);
      resolve();
    });
  })));
});
