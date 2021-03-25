import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import { selectChaptersLoading, getChapters } from '../store/reducers/chapters';
import { selectUserName, setUserName } from '../store/reducers/user';
import * as Button from '../components/Button';
import { TextInput } from '../components/TextInput';
import { screenPropTypes } from '../constants/propTypes';

export function NewGameScreen({ navigation }) {
  const dispatch = useDispatch();
  const chaptersLoading = useSelector(selectChaptersLoading);
  const userName = useSelector(selectUserName);
  const placeholder = 'Ditt namn';

  const startGame = React.useCallback(() => {
    // validate user
    if (!userName) return;
    navigation.navigate('game/start');
  }, [navigation]);

  const handleChangeText = (text) => {
    dispatch(setUserName(text));
  };

  React.useEffect(() => {
    dispatch(getChapters());
  }, [getChapters]);

  return (
    <SafeAreaView style={styles.container}>
      {chaptersLoading && <Text>laddar kapitel</Text>}
      <Text>New Game Screen</Text>
      <TextInput placeholder={placeholder} onChangeText={handleChangeText} />
      <Button.Primary disabled={!userName} text="Starta" style={styles.button} onPress={startGame} />
    </SafeAreaView>
  );
}
NewGameScreen.propTypes = {
  ...screenPropTypes,
};

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
