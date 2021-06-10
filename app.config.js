import 'dotenv/config';

const missingEnvironmentVariables = [
  'APP_BUNDLE_ID',
  'MAPS_ANDROID_API_KEY',
  'SENTRY_ORG',
  'SENTRY_PROJECT',
  'SENTRY_DSN',
  'SENTRY_AUTH_TOKEN',
].filter((key) => typeof process.env[key] !== 'string');

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `Missing required environmental variables: ${missingEnvironmentVariables.join(', ')}`
  );
}

const version = 10;

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
    hooks: {
      ...config.hooks,
      postPublish: [
        ...config.hooks.postPublish,
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
          },
        },
      ],
    },
    extra: {
      ...config.extra,
      sentryDsn: process.env.SENTRY_DSN,
      isProduction: process.env.NODE_ENV === 'production',
    },
  };

  return combinedConfig;
};
