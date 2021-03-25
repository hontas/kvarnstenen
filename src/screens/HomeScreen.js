import * as React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { screenPropTypes } from '../constants/propTypes';
import { selectHomeScreen, selectScreensLoading } from '../store/reducers/screens';
import * as Button from '../components/Button';
import { Heading } from '../components/Heading';

export function HomeScreen({ navigation }) {
  const newGame = React.useCallback(() => {
    // reset gameplay
    navigation.navigate('game/new');
  }, [navigation]);
  const hasSavedGames = true;
  const isLoading = useSelector(selectScreensLoading);
  const hs = useSelector(selectHomeScreen);
  console.log('isLoading', isLoading);

  if (isLoading) return <Heading>Laddar data</Heading>;
  if (!hs) return <Heading>Ngt gick snett</Heading>;

  return (
    <SafeAreaView style={styles.container}>
      <Heading>{hs.title}</Heading>
      <View style={styles.actionButtons}>
        <Button.Primary text={hs.new_game_button_text} style={styles.button} onPress={newGame} />
        {hasSavedGames && (
          <Button.Secondary
            text={hs.continue_game_button_text}
            style={styles.button}
            onPress={() => navigation.navigate('ContinueGame')}
          />
        )}
        <Button.Tertiary
          text={hs.how_to_play_button_text}
          style={styles.button}
          onPress={() => navigation.navigate('HowToPlay')}
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
