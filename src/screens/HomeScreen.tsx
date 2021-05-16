import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import useT from '../utils/useT';
import { selectScreen, selectScreensLoading, selectScreensError } from '../store/reducers/screens';
import { selectSlotsList, createNewGame } from '../store/reducers/game';
import * as Button from '../components/Button';
import { Heading } from '../components/Heading';
import { LoadingScreen } from './LoadingScreen';
import { ROUTE_NAMES } from '../constants/routes';
import { ScreenProps } from '../constants/types';

type Props = ScreenProps;

export function HomeScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectScreensLoading);
  const error = useSelector(selectScreensError);
  const screen = useSelector(selectScreen('home'));
  const slotsArray = useSelector(selectSlotsList);
  const hasSavedGames = slotsArray.length > 0;
  const t = useT(screen?.ui_texts);

  const newGame = useCallback(async () => {
    // reset gameplay
    await dispatch(createNewGame());
    navigation.navigate(ROUTE_NAMES.GAME_LOADING);
  }, [navigation, dispatch]);

  useEffect(() => {
    if (screen) {
      navigation.setOptions({ title: screen.name });
    }
  }, [screen, navigation]);

  if (error) return <Heading>Ngt gick snett {error}</Heading>;
  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <Heading>{screen.title}</Heading>
      <View style={styles.actionButtons}>
        <Button.Primary text={t('new_game')} style={styles.button} onPress={newGame} />
        {hasSavedGames && (
          <Button.Secondary
            text={t('continue_game')}
            style={styles.button}
            onPress={() => navigation.navigate(ROUTE_NAMES.CONTINUE_GAME)}
          />
        )}
        <Button.Tertiary
          text={t('how_to_play')}
          style={styles.button}
          onPress={() => navigation.navigate(ROUTE_NAMES.HOW_TO_PLAY)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 50,
    marginHorizontal: 20,
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    marginTop: 30,
  },
});
