import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import useT from '../utils/useT';
import { getChapters } from '../store/reducers/chapters';
import { selectUserName, setUserName } from '../store/reducers/user';
import { selectScreen } from '../store/reducers/screens';
import * as Button from '../components/Button';
import { TextInput } from '../components/TextInput';
import { ScreenProps } from '../constants/types';
import { ROUTE_NAMES } from '../constants/routes';

export function NewGameScreen({ navigation }: ScreenProps) {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const screen = useSelector(selectScreen('new-game'));
  const t = useT(screen?.ui_texts);

  const startGame = useCallback(() => {
    // validate user
    navigation.navigate(ROUTE_NAMES.START_GAME);
  }, [navigation]);

  const handleChangeText = (text) => {
    dispatch(setUserName(text));
  };

  useEffect(() => {
    if (screen) {
      navigation.setOptions({ title: screen.name });
    }
  }, [screen, navigation]);

  useEffect(() => {
    dispatch(getChapters());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>{screen.title}</Text>
      <TextInput placeholder={t('name_input_placeholder')} onChangeText={handleChangeText} />
      <Button.Primary disabled={!userName} text={t('start_game')} style={styles.button} onPress={startGame} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 100,
    marginHorizontal: 20,
  },
  button: {
    marginTop: 30,
  },
});
