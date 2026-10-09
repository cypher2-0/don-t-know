const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Allow the app to import shared code (e.g. ../lib) from the repo root.
config.watchFolders = [workspaceRoot];

module.exports = withNativeWind(config, { input: './src/global.css' });
