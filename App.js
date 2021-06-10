import 'intl';
import 'intl/locale-data/jsonp/se';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Updates from 'expo-updates';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import configureStore from './src/store/configureStore';
import { getScreensData } from './src/store/reducers/screens';
import { getChapters } from './src/store/reducers/chapters';
import { getConfig } from './src/store/reducers/config';
import { getSavedGameState } from './src/store/reducers/game';
import * as localState from './src/store/reducers/localState';
import { RootNavigator } from './src/navigators/rootNavigator';
import { SystemMessage } from './src/components/SystemMessage';

Sentry.init({
  dsn: Constants.manifest.extra.sentryDsn,
  enableInExpoDevelopment: true,
  debug: !Constants.manifest.extra.isProduction,
});

const store = configureStore();
const configPromise = store.dispatch(getConfig());
const screensPromise = store.dispatch(getScreensData());
store.dispatch(getSavedGameState());
store.dispatch(getChapters());
store.dispatch(localState.init());

Updates.addListener((updateEvent) => {
  if (updateEvent.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
    store.dispatch(localState.updateAvailable());
  }
  if (updateEvent.type === Updates.UpdateEventType.ERROR) {
    console.warn(updateEvent.message);
  }
});

function App() {
  const [isReady, setIsReady] = React.useState(false);

  if (isReady === false) {
    return (
      <AppLoading
        startAsync={async () => {
          const images = [require('./assets/kvarnsten.png')];

          const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
          });
          return Promise.all([...cacheImages, screensPromise, configPromise]);
        }}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <SystemMessage />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
