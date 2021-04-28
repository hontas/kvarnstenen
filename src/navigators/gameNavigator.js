import * as React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';

import { selectChapters } from '../store/reducers/chapters';
import { ChapterScreen } from '../screens/ChapterScreen';

export const transitionConfig = {
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
const commonOptions = {
  headerShown: false,
  cardStyleInterpolator: fadeInOut,
  transitionSpec: {
    open: transitionConfig,
    close: transitionConfig,
  },
};

export function GameNavigator() {
  const chapters = useSelector(selectChapters);
  // console.log('chapters', chapters);
  const screens = React.useMemo(() => {
    return Object.keys(chapters).sort();
  }, [chapters]);

  return (
    <Stack.Navigator screenOptions={commonOptions}>
      {screens.map((key) => (
        <Stack.Screen key={`chapter/${key}`} name={`chapter/${key}`} component={ChapterScreen} />
      ))}
    </Stack.Navigator>
  );
}
GameNavigator.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
};
