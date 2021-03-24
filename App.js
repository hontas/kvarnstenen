import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import { getScreensData } from './src/store/reducers/screens';
import { UserProvider } from './src/context/userContext';
import { StoryProvider } from './src/context/storyContext';
import { RootNavigator } from './src/navigators/rootNavigator';

const store = configureStore();
store.dispatch(getScreensData());

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <StoryProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </StoryProvider>
      </UserProvider>
    </Provider>
  );
}

export default App;
