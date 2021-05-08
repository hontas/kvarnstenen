import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { selectChapters } from '../store/reducers/chapters';
import { setCurrentChapter } from '../store/reducers/game';
import { ChapterScreen } from '../screens/ChapterScreen';
import { ScreenProps } from '../constants/types';

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

const getRouteName = (key) => `chapter/${key}`;

export function GameNavigator({ navigation, route }: ScreenProps) {
  const dispatch = useDispatch();
  const chapters = useSelector(selectChapters);
  const screens = React.useMemo(() => {
    return Object.keys(chapters).sort();
  }, [chapters]);

  const startAt = route.params?.startAt;
  const initialRouteName = startAt && getRouteName(startAt);

  React.useEffect(() => {
    if (screens.length > 0) {
      const chapter = chapters[startAt || screens[0]];
      const { name, path } = chapter;
      const routeName = getRouteName(path);
      dispatch(setCurrentChapter(routeName, name));
    }
  }, [chapters, screens, dispatch, startAt, navigation]);

  return (
    <Stack.Navigator screenOptions={commonOptions} initialRouteName={initialRouteName}>
      {screens.map((key) => {
        const name = getRouteName(key);
        return <Stack.Screen key={name} name={name} component={ChapterScreen} />;
      })}
    </Stack.Navigator>
  );
}
GameNavigator.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
};
