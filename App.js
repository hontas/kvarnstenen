import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from './src/context/userContext';
import { StoryProvider } from './src/context/storyContext';
import { RootNavigator } from './src/navigators/rootNavigator';

function App() {
  return (
    <UserProvider>
      <StoryProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </StoryProvider>
    </UserProvider>
  );
}

export default App;
