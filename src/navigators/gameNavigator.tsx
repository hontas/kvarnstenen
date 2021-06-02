import * as React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { selectChapters } from '../store/reducers/chapters';
import { ChapterScreen } from '../screens/ChapterScreen';
import { ScreenProps } from '../constants/types';
import { getChapterRouteName } from '../constants/routes';

interface TransitionConfig {
  animation: 'timing';
  config: {
    duration: number;
  };
}

export const transitionConfig: TransitionConfig = {
  animation: 'timing',
  config: {
    duration: 2000,
  },
};

export const fadeInOut = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();
const commonOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: fadeInOut,
  transitionSpec: {
    open: transitionConfig,
    close: transitionConfig,
  },
};

export function GameNavigator({ route }: ScreenProps) {
  const chapters = useSelector(selectChapters);
  const screens = React.useMemo(() => {
    return Object.keys(chapters).sort((a, b) => {
      return Number.parseInt(a) - Number.parseInt(b);
    });
  }, [chapters]);

  const startAt = route.params?.startAt;
  const initialRouteName = startAt && getChapterRouteName(startAt);

  return (
    <Stack.Navigator screenOptions={commonOptions} initialRouteName={initialRouteName}>
      {screens.map((key) => {
        const name = getChapterRouteName(key);
        return <Stack.Screen key={name} name={name} component={ChapterScreen} />;
      })}
    </Stack.Navigator>
  );
}
