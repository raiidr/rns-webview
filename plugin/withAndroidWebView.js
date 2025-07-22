// plugin/withAndroidWebView.js
const { withDangerousMod } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs-extra');

module.exports = function withAndroidWebView(config, props = {}) {
    return withDangerousMod(config, ['android', async (config) => {
        const sourceDir = path.join(__dirname, '..', 'android', 'src');
        const targetDir = path.join(
            config.modRequest.projectRoot,
            'android',
            'app',
            'src',
            'main',
            'java',
            'com',
            'rnswebview'
        );

        try {
            const shouldInject = !(await fs.pathExists(path.join(targetDir, 'CustomWebViewManager.kt')));

            if (shouldInject && await fs.pathExists(sourceDir)) {
                await fs.ensureDir(targetDir);
                await fs.copy(sourceDir, targetDir);
                console.log('✅ RNS WebView native files injected');
            } else {
                console.warn('⚠️ Native files already present or source directory missing — skipping injection.');
            }
        } catch (error) {
            console.error('❌ Error during native injection:', error);
            throw error;
        }

        return config;
    }]);
};