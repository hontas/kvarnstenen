import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { NewGameScreen } from '../screens/NewGameScreen';
import { HowToPlayScreen } from '../screens/HowToPlayScreen';
import { ContinueGameScreen } from '../screens/ContinueGameScreen';
import { GameNavigator } from './gameNavigator';

const Stack = createStackNavigator();
const routes = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      title: 'Home',
      headerShown: false,
    },
  },
  {
    name: 'HowToPlay',
    component: HowToPlayScreen,
    options: {
      title: 'Hur spelar man',
      headerShown: false,
    },
  },
  {
    name: 'ContinueGame',
    component: ContinueGameScreen,
    options: {
      title: 'Fortsätt sparat spel',
      headerShown: true,
    },
  },
  {
    // TODO: Move to gameNavigator?
    name: 'game/new',
    component: NewGameScreen,
    options: {
      title: 'Nytt Spel',
    },
  },
  {
    name: 'game/start',
    component: GameNavigator,
    options: {
      title: 'Börja Spela',
      headerShown: false,
    },
  },
];
const commonOptions = {};

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={commonOptions}>
      {routes.map(({ name, component, options }) => (
        <Stack.Screen key={name} name={name} component={component} options={options} />
      ))}
    </Stack.Navigator>
  );
}
