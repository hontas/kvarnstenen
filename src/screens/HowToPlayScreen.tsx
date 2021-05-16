import * as React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';

import useT from '../utils/useT';
import { selectScreen } from '../store/reducers/screens';
import * as Button from '../components/Button';
import { BackButton } from '../components/BackButton';
import { Paragraph } from '../components/Paragraph';
import { Heading } from '../components/Heading';
import { ScreenProps } from '../constants/types';

export function HowToPlayScreen({ navigation }: ScreenProps) {
  const screen = useSelector(selectScreen('how-to-play'));
  const t = useT(screen?.ui_texts);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={goBack} style={styles.backButton} />
      <ScrollView>
        <View style={styles.inner}>
          <Heading level={2}>{screen.title}</Heading>
          <Paragraph>{t('paragraph')}</Paragraph>
          <Button.Primary text={t('go_back_button')} style={styles.button} onPress={goBack} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    left: 10,
  },
  inner: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
  button: {
    marginTop: 30,
  },
});
