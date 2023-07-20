const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);



const exclusionList = require('metro-config/src/defaults/exclusionList');
// module.exports = 
// { 
//   resolver: {
//     blacklistRE: exclusionList([/#current-cloud-backend\/.*/])
//   }
// };


// using chat gpt combined two lines 😁
module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    blacklistRE: exclusionList([/#current-cloud-backend\/.*/])
  }
});
