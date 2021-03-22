import * as React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import * as Button from '../components/Button';
import { Heading } from '../components/Heading';

export function HomeScreen({ navigation }) {
  const newGame = React.useCallback(() => {
    // reset gameplay
    navigation.navigate('game/new');
  }, [navigation]);
  const hasSavedGames = true;

  return (
    <SafeAreaView style={styles.container}>
      <Heading>Kvarnstenen</Heading>
      <View style={styles.actionButtons}>
        <Button.Primary text="Nytt spel" style={styles.button} onPress={newGame} />
        {hasSavedGames && (
          <Button.Secondary
            text="Fortsätt spel"
            style={styles.button}
            onPress={() => navigation.navigate('ContinueGame')}
          />
        )}
        <Button.Tertiary
          text="Hur spelar man?"
          style={styles.button}
          onPress={() => navigation.navigate('HowToPlay')}
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
