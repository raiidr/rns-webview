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
            await fs.ensureDir(targetDir);

            // Check if source directory exists
            if (await fs.pathExists(sourceDir)) {
                await fs.copy(sourceDir, targetDir);
                console.log('✅ RNS WebView Android files copied successfully');
            } else {
                console.warn('⚠️ Android source directory not found:', sourceDir);
            }
        } catch (error) {
            console.error('❌ Error copying Android files:', error);
            throw error;
        }

        return config;
    }]);
};