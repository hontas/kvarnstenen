const dotenv = require('dotenv');
dotenv.config();

const version = 9;

export default ({ config }) => {
  const combinedConfig = {
    ...config,
    version: `0.0.${version}`,
    ios: {
      ...config.ios,
      buildNumber: `0.0.${version}`,
      bundleIdentifier: process.env.APP_BUNDLE_ID,
    },
    android: {
      ...config.android,
      versionCode: version,
      package: process.env.APP_BUNDLE_ID,
      config: {
        ...config.android.config,
        googleMaps: {
          apiKey: process.env.MAPS_ANDROID_API_KEY,
        },
      },
    },
  };

  console.log('config', combinedConfig);

  return combinedConfig;
};
