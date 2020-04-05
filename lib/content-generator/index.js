'use strict';

const StaticSiteJson = require('broccoli-static-site-json');

const contentsJson = new StaticSiteJson(`content`, {
  attributes: ['title'],
  contentFolder: 'contents',
  contentTypes: ['html'],
});

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    return contentsJson;
  }
};
