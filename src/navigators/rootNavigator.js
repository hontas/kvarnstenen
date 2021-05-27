import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { NewGameScreen } from '../screens/NewGameScreen';
import { HowToPlayScreen } from '../screens/HowToPlayScreen';
import { ContinueGameScreen } from '../screens/ContinueGameScreen';
import { GameLoadingScreen } from '../screens/GameLoadingScreen';
import { GameNavigator, transitionConfig, fadeInOut } from './gameNavigator';
import { ROUTE_NAMES } from '../constants/routes';
import { selectConfig } from '../store/reducers/config';
import PropTypes from '../constants/propTypes';

const Stack = createStackNavigator();
const routes = [
  {
    name: ROUTE_NAMES.HOME,
    component: HomeScreen,
  },
  {
    name: ROUTE_NAMES.HOW_TO_PLAY,
    component: HowToPlayScreen,
    options: {
      headerShown: true,
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
    name: ROUTE_NAMES.NEW_GAME,
    component: NewGameScreen,
  },
  {
    name: ROUTE_NAMES.GAME_LOADING,
    component: GameLoadingScreen,
  },
  {
    name: ROUTE_NAMES.START_GAME,
    component: GameNavigator,
    options: {
      cardStyleInterpolator: fadeInOut,
      transitionSpec: {
        open: transitionConfig,
        close: transitionConfig,
      },
    },
  },
];

const commonOptions = {
  headerStyle: {
    shadowColor: 'transparent',
  },
  headerShown: false,
  headerTitleStyle: { color: 'transparent' },
  headerBackTitleVisible: false,
  headerLeftContainerStyle: {
    left: 20,
  },
};

const CustomBackImage = ({ tintColor }) => <Entypo name="back" size={20} color={tintColor} />;
CustomBackImage.propTypes = {
  tintColor: PropTypes.string,
};

export function RootNavigator() {
  const { background_color_primary, text_color_primary } = useSelector(selectConfig);
  const screenOptions = {
    ...commonOptions,
    headerStyle: {
      ...commonOptions.headerStyle,
      backgroundColor: background_color_primary,
    },
    headerTintColor: text_color_primary,
    headerBackImage: CustomBackImage,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {routes.map(({ name, component, options }) => (
        <Stack.Screen key={name} name={name} component={component} options={options} />
      ))}
    </Stack.Navigator>
  );
}
