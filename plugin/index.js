// plugin/index.js 
import withRNSWebView from './withRNSWebView.js';

export default function (config, props = {}) {
    return withRNSWebView(config, props);
}