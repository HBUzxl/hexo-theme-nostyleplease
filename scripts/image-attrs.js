'use strict';

// 图片默认懒加载、异步解码
hexo.extend.filter.register('after_post_render', function (data) {
  data.content = data.content.replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"');

  // 独立成段的图片包进 figure；Markdown 的 title 变成图注
  data.content = data.content.replace(/<p>\s*(<img\b[^>]*>)\s*<\/p>/g, function (match, img) {
    var title = /\stitle="([^"]*)"/.exec(img);
    var clean = img.replace(/\stitle="[^"]*"/, '');
    return '<figure class="image">' + clean + (title ? '<figcaption>' + title[1] + '</figcaption>' : '') + '</figure>';
  });

  return data;
});
