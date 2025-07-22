// src/index.js
const { requireNativeComponent } = require('react-native');

const RaiidrWebView = requireNativeComponent('MyRaiidrWebView');

module.exports = {
    RaiidrWebView,
};

// Also export as default for ES6 imports
module.exports.default = module.exports;