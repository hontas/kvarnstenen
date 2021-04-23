import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import { screenPropTypes } from '../constants/propTypes';
import * as Button from '../components/Button';
import { selectChaptersLoading, selectChapters } from '../store/reducers/chapters';

export function ChaptersLoadingScreen({ navigation }) {
  const chapters = useSelector(selectChapters);
  const chaptersLoading = useSelector(selectChaptersLoading);

  const firstChapter = useMemo(() => {
    return chapters && Object.keys(chapters).find((chapter) => chapter.startsWith('1'));
  }, [chapters]);

  const goToFirstChapter = useCallback(() => {
    navigation.navigate(`chapter/${firstChapter}`);
  }, [navigation, firstChapter]);

  useEffect(() => {
    if (!chaptersLoading) {
      goToFirstChapter();
    }
  }, [chaptersLoading, goToFirstChapter]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>LOADING</Text>
      <Button.Primary text="Go to first chapter" onPress={goToFirstChapter} />
    </SafeAreaView>
  );
}
ChaptersLoadingScreen.propTypes = {
  ...screenPropTypes,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
});
