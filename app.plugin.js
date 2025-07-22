const { withPlugins } = require('@expo/config-plugins');
const withAndroidWebView = require('./plugin/withAndroidWebView');

module.exports = function withRNSWebView(config, props = {}) {
    return withPlugins(config, [
        [withAndroidWebView, props],
    ]);
};