// plugin/index.js
const withRNSWebView = require('./withRNSWebView');

module.exports = function (config, props = {}) {
    return withRNSWebView(config, props);
};
