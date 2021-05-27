import * as React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, StyleSheet } from 'react-native';

import useT from '../utils/useT';
import { selectScreen } from '../store/reducers/screens';
import * as Button from '../components/Button';
import { Layout } from '../components/Layout';
import { Paragraph } from '../components/Paragraph';
import { Heading } from '../components/Heading';
import { ScreenProps } from '../constants/types';
import * as LAYOUT from '../constants/layout';

export function HowToPlayScreen({ navigation }: ScreenProps) {
  const screen = useSelector(selectScreen('how-to-play'));
  const t = useT(screen?.ui_texts);

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Layout contentContainerStyle={styles.container}>
      <ScrollView>
        <View style={styles.inner}>
          <Heading level={2} containerStyle={styles.header}>
            {screen.title}
          </Heading>
          <Paragraph>{t('paragraph')}</Paragraph>
          <Button.Primary text={t('go_back_button')} style={styles.button} onPress={goBack} />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
  },
  inner: {
    marginBottom: 50,
    marginHorizontal: LAYOUT.horizontalMargin,
  },
  header: {
    marginTop: LAYOUT.horizontalMargin,
  },
  button: {
    marginTop: 30,
  },
});
