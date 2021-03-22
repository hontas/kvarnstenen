import * as React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

import * as Button from '../components/Button';
import COLORS from '../constants/colors';

export function ContinueGameScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Button.Primary text="Slot #1" style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonSubText}>Kapitel 3a - Liams mamma [2021-03-21 23:02]</Text>
      </Button.Primary>
      <Button.Primary text="Slot #2" style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonSubText}>Kapitel 4c - Torget [2021-03-21 23:02]</Text>
      </Button.Primary>
      <Button.Primary text="Slot #3" style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonSubText}>Kapitel 1 - intro [2021-03-21 23:02]</Text>
      </Button.Primary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginHorizontal: 20,
  },
  button: {
    height: 60,
    marginTop: 30,
    alignItems: 'flex-start',
  },
  buttonSubText: {
    color: COLORS.button.text_primary,
    alignSelf: 'flex-end',
  },
});
