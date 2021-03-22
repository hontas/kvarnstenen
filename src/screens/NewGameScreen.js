import * as React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import { useUser } from '../context/userContext';
import * as Button from '../components/Button';
import { TextInput } from '../components/TextInput';
import { screenPropTypes } from '../constants/propTypes';

export function NewGameScreen({ navigation }) {
  const startGame = React.useCallback(() => {
    // validate user name
    navigation.navigate('game/start');
  }, [navigation]);

  const handleChangeText = (text) => {
    setUserName(text);
  };

  const { user, setUserName } = useUser();
  const placeholder = user?.name || 'Ditt namn';

  return (
    <SafeAreaView style={styles.container}>
      <Text>New Game Screen for {user.name}</Text>
      <TextInput placeholder={placeholder} onChangeText={handleChangeText} />
      <Button.Primary text="Starta" style={styles.button} onPress={startGame} />
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
