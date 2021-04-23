import * as React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';

import { selectChapters } from '../store/reducers/chapters';
import { ChapterScreen } from '../screens/ChapterScreen';
import { ChaptersLoadingScreen } from '../screens/ChaptersLoadingScreen';
// import { InGameMenuScreen } from '../screens/InGameMenuScreen';

const Stack = createStackNavigator();
const commonOptions = {
  headerShown: true,
};

export function GameNavigator() {
  const chapters = useSelector(selectChapters);
  // console.log('chapters', chapters);

  return (
    <Stack.Navigator screenOptions={commonOptions}>
      <Stack.Screen key={`chapter/loading`} name={`chapterloading`} component={ChaptersLoadingScreen} />
      {Object.keys(chapters).map((key) => (
        <Stack.Screen key={`chapter/${key}`} name={`chapter/${key}`} component={ChapterScreen} />
      ))}
    </Stack.Navigator>
  );
}
GameNavigator.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
};
