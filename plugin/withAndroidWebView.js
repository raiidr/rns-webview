// plugin/withAndroidWebView.js
import { withDangerousMod } from '@expo/config-plugins';
import path from 'path';
import fs from 'fs-extra';

export default function withAndroidWebView(config, props = {}) {
    return withDangerousMod(config, ['android', async (config) => {
        const sourceDir = path.join(process.cwd(), 'node_modules', 'rns-webview', 'android', 'src');
        const targetDir = path.join(
            config.modRequest.projectRoot,
            'android',
            'app',
            'src',
            'main',
            'java',
            'com',
            'raiidr',
            'www'
        );

        try {
            await fs.ensureDir(targetDir);
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
}