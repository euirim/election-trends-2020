const safe = require('nunjucks').runtime.markSafe;
const marked = require('marked');

marked.setOptions({ smartypants: true });

module.exports = {
  markdownFilter: (str, kwargs) => {
    // strip outer <p> tags?
    const strip = typeof kwargs === 'undefined' ?
      false : kwargs.strip || false;
    return !strip ? safe(marked(str)) :
      safe(marked(str).trim().replace(/^<p>|<\/p>$/g, ''));
  },
  imageVersionFilter: (str, size) => {
    if (str) {
      var ls = str.split(".");
      return ls.slice(0, -1) + "-" + String(size) + "." + ls[ls.length - 1];
    }
    else {
      return str;
    }
  },
};
