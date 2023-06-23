// const { getDefaultConfig } = require("metro-config");
// const {
//   getDefaultConfig: getExpoDefaultConfig,
// } = require("@expo/metro-config");

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();

//   const defaultConfig = getExpoDefaultConfig(__dirname);
//   defaultConfig.resolver.assetExts.push("cjs");

//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-svg-transformer"),
//     },
//     resolver: {
//       assetExts: [...assetExts.filter((ext) => ext !== "svg"), "cjs"],
//       sourceExts: [...sourceExts, "svg"],
//     },
//     ...defaultConfig,
//   };
// })();

const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
