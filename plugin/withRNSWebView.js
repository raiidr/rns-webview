// plugin/withRNSWebView.js 
const { withPlugins } = require('@expo/config-plugins');
const withAndroidWebView = require('./withAndroidWebView');

module.exports = function (config, props) {
    return withPlugins(config, [
        [withAndroidWebView, props],
    ]);
};