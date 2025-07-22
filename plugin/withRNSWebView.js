// withRNSWebView.js 
import { withPlugins } from '@expo/config-plugins';
import withAndroidWebView from './withAndroidWebView.js';

export default function (config, props) {
    return withPlugins(config, [
        [withAndroidWebView, props],
    ]);
}
