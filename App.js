import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import { getScreensData } from './src/store/reducers/screens';
import { getChapters } from './src/store/reducers/chapters';
import { getSavedGameState } from './src/store/reducers/game';
import { UserProvider } from './src/context/userContext';
import { RootNavigator } from './src/navigators/rootNavigator';

const store = configureStore();
store.dispatch(getScreensData());
store.dispatch(getSavedGameState());
store.dispatch(getChapters());

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}

export default App;
