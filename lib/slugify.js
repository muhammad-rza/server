var slugUrl = require('slug');

slugUrl.defaults.mode = 'pretty';
slugUrl.defaults.modes['pretty'] = {
    replacement: '-',
    symbols: true,
    remove: /[.]/g,
    lower: true,
    charmap: slugUrl.charmap,
    multicharmap: slugUrl.multicharmap
};


module.exports =  function  (url) {
   return  slugUrl(url);
}