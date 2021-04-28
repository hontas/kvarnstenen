import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import useT from '../utils/useT';
import { screenPropTypes } from '../constants/propTypes';
import { selectScreen, selectScreensLoading, selectScreensError } from '../store/reducers/screens';
import * as Button from '../components/Button';
import { Heading } from '../components/Heading';
import { LoadingScreen } from './LoadingScreen';
import { ROUTE_NAMES } from '../constants/routes';

export function HomeScreen({ navigation }) {
  const newGame = useCallback(() => {
    // reset gameplay
    navigation.navigate(ROUTE_NAMES.GAME_LOADING);
  }, [navigation]);
  const hasSavedGames = true;
  const isLoading = useSelector(selectScreensLoading);
  const error = useSelector(selectScreensError);
  const screen = useSelector(selectScreen('home'));
  const t = useT(screen?.ui_texts);

  useEffect(() => {
    if (screen) {
      navigation.setOptions({ title: screen.name });
    }
  }, [screen]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <Heading>Ngt gick snett</Heading>;

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

HomeScreen.propTypes = {
  navigation: screenPropTypes.navigation,
};

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
