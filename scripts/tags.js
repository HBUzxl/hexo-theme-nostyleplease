'use strict';

function parseArgs(args) {
  return args.reduce(function (options, arg) {
    var separator = arg.indexOf('=');
    if (separator < 1) return options;
    var key = arg.slice(0, separator).trim();
    var value = arg.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    options[key] = value;
    return options;
  }, {});
}

hexo.extend.tag.register('details', function (args, content) {
  var options = parseArgs(args);
  var open = options.open === 'true' ? ' open' : '';
  var summary = options.summary || 'Details:';
  var inner = hexo.render.renderSync({ text: content, engine: 'markdown' });
  return '<details' + open + '>\n<summary>' + summary + '</summary>\n' + inner + '</details>';
}, { ends: true });
