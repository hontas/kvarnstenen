import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';

import { useStory } from '../context/storyContext';
import { ChapterScreen } from '../screens/ChapterScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
// import { InGameMenuScreen } from '../screens/InGameMenuScreen';

const Stack = createStackNavigator();
const commonOptions = {
  headerShown: false,
};
// const chapter = {
//   path: '1:1',
//   name: 'Liams mamma',
//   content: [{ type: 'xxx', data: {} }],
//   edges: [{ path: '1:2', conditions: [{ path: '0:3', choice: 'a' }] }],
// };

export function GameNavigator() {
  const state = useStory();
  const { chapters = [] } = state;
  console.log('chapters', chapters);

  return (
    <Stack.Navigator screenOptions={commonOptions}>
      <Stack.Screen key={`chapter/loading`} name={`chapterloading`} component={LoadingScreen} />
      {chapters.map(({ name }) => (
        <Stack.Screen key={`chapter/${name}`} name={`chapter/${name}`} component={ChapterScreen} />
      ))}
    </Stack.Navigator>
  );
}
GameNavigator.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
};
