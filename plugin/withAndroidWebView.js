// withAndroidWebView.js 
const { withDangerousMod } = require('@expo/config-plugins');

const path = require('path');
const fs = require('fs-extra'); // use this for recursive copy

module.exports = function (config, props = {}) {
    return withDangerousMod(config, ['android', async config => {
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

        await fs.ensureDir(targetDir);
        await fs.copy(sourceDir, targetDir); // recursively copy everything

        return config;
    }]);
};

