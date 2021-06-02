const dotenv = require('dotenv');
dotenv.config();

export default ({ config }) => {
  return {
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
};
