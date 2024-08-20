// metro.config.js
const { getDefaultConfig } = require('@react-native/metro-config');
const { mergeConfig } = require('metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 * 
 * @type {import('metro-config').MetroConfig}
 */

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// module.exports = {
//     resolver: {
//       assetExts: ['db', 'mp4', 'pdf', 'svg', 'png'],
//       sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'json'],
//     },
//   };