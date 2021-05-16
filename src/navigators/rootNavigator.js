import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { NewGameScreen } from '../screens/NewGameScreen';
import { HowToPlayScreen } from '../screens/HowToPlayScreen';
import { ContinueGameScreen } from '../screens/ContinueGameScreen';
import { GameLoadingScreen } from '../screens/GameLoadingScreen';
import { GameNavigator, transitionConfig, fadeInOut } from './gameNavigator';
import { ROUTE_NAMES } from '../constants/routes';

const Stack = createStackNavigator();
const routes = [
  {
    name: ROUTE_NAMES.HOME,
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTE_NAMES.HOW_TO_PLAY,
    component: HowToPlayScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTE_NAMES.CONTINUE_GAME,
    component: ContinueGameScreen,
    options: {
      headerShown: true,
    },
  },
  {
    // TODO: Move to gameNavigator?
    name: ROUTE_NAMES.NEW_GAME,
    component: NewGameScreen,
    options: {},
  },
  {
    name: ROUTE_NAMES.GAME_LOADING,
    component: GameLoadingScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTE_NAMES.START_GAME,
    component: GameNavigator,
    options: {
      headerShown: false,
      cardStyleInterpolator: fadeInOut,
      transitionSpec: {
        open: transitionConfig,
        close: transitionConfig,
      },
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
