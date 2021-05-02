import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

import useT from '../utils/useT';
import { getChapters, selectScreen } from '../store/reducers/screens';
import { screenPropTypes } from '../constants/propTypes';
import { ROUTE_NAMES } from '../constants/routes';
import { selectChaptersLoading, selectChapters } from '../store/reducers/chapters';

export function GameLoadingScreen({ navigation }) {
  const dispatch = useDispatch();
  const chapters = useSelector(selectChapters);
  const chaptersLoading = useSelector(selectChaptersLoading);
  const screen = useSelector(selectScreen('game-loading'));
  const t = useT(screen?.ui_texts);

  // TODO: preload music, voice and other media?

  const firstChapter = useMemo(() => {
    return chapters && Object.keys(chapters).find((chapter) => chapter.startsWith('1'));
  }, [chapters]);

  const goToFirstChapter = useCallback(() => {
    navigation.navigate(ROUTE_NAMES.START_GAME);
  }, [navigation, firstChapter]);

  useEffect(() => {
    if (firstChapter && !chaptersLoading) {
      console.log('navigate!');
      setTimeout(() => goToFirstChapter(), 1000);
    }
  }, [firstChapter, chaptersLoading, goToFirstChapter]);

  useEffect(() => {
    if (!firstChapter && !chaptersLoading) {
      dispatch(getChapters());
    }
  }, [firstChapter, chaptersLoading, getChapters]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>{t('loading_text')}</Text>
      {/* <Button.Primary disabled={chaptersLoading} text="Go to first chapter" onPress={goToFirstChapter} /> */}
    </SafeAreaView>
  );
}
GameLoadingScreen.propTypes = {
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
