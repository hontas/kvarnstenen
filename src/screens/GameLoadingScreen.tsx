import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, ActivityIndicator } from 'react-native';

import useT from '../utils/useT';
import { selectScreen } from '../store/reducers/screens';
import { ScreenProps } from '../constants/types';
import { ROUTE_NAMES, getChapterRouteName } from '../constants/routes';
import { getChapters, selectChaptersLoading, selectChapters } from '../store/reducers/chapters';
import { Layout } from '../components/Layout';
import * as Text from '../components/Text';

type Props = ScreenProps;

// TODO: remove this? Do we need it? 🤔
export function GameLoadingScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const chapters = useSelector(selectChapters);
  const chaptersLoading = useSelector(selectChaptersLoading);
  const screen = useSelector(selectScreen('game-loading'));
  const t = useT(screen?.ui_texts);

  // TODO: preload music, voice and other media?

  const firstChapter = useMemo(() => {
    return chapters && Object.keys(chapters).find((chapter) => chapter.startsWith('1-'));
  }, [chapters]);

  const goToFirstChapter = useCallback(() => {
    navigation.navigate(ROUTE_NAMES.START_GAME);
  }, [navigation]);

  useEffect(() => {
    if (firstChapter && !chaptersLoading) {
      setTimeout(() => goToFirstChapter(), 1000);
    }
  }, [firstChapter, chaptersLoading, goToFirstChapter]);

  useEffect(() => {
    if (!firstChapter && !chaptersLoading) {
      dispatch(getChapters());
    }
  }, [firstChapter, chaptersLoading, dispatch]);

  return (
    <Layout contentContainerStyle={styles.container}>
      <ActivityIndicator size="large" />
      <Text.Regular>{t('loading_text')}</Text.Regular>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
