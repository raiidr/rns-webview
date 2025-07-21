const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function (config, props = {}) {
    return withDangerousMod(config, [
        'android',
        async (config) => {
            const targetPath = path.join(config.modRequest.projectRoot, 'android', 'app', 'src', 'main', 'java', 'com', 'rnswebview');
            const sourcePath = path.join(__dirname, '..', 'android');

            // Ensure the target directory exists
            fs.mkdirSync(targetPath, { recursive: true });

            // Copy each Kotlin file from source to target
            fs.readdirSync(sourcePath).forEach(file => {
                const src = path.join(sourcePath, file);
                const dest = path.join(targetPath, file);
                fs.copyFileSync(src, dest);
            });

            return config;
        },
    ]);
};
