const dotenv = require('dotenv');
dotenv.config();

export default ({ config }) => {
  const combinedConfig = {
    ...config,
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.APP_BUNDLE_ID,
    },
    android: {
      ...config.android,
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
