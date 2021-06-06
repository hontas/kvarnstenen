import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';

import configureStore from './src/store/configureStore';
import { getScreensData } from './src/store/reducers/screens';
import { getChapters } from './src/store/reducers/chapters';
import { getConfig } from './src/store/reducers/config';
import { getSavedGameState } from './src/store/reducers/game';
import { RootNavigator } from './src/navigators/rootNavigator';

const store = configureStore();
const configPromise = store.dispatch(getConfig());
const screensPromise = store.dispatch(getScreensData());
store.dispatch(getSavedGameState());
store.dispatch(getChapters());

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
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
    </Provider>
  );
}

export default App;
