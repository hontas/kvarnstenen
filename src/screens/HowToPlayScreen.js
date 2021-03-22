import * as React from 'react';
import { ScrollView, View, StyleSheet, SafeAreaView } from 'react-native';

import * as Button from '../components/Button';
import { Paragraph } from '../components/Paragraph';
import { Heading } from '../components/Heading';
import { screenPropTypes } from '../constants/propTypes';

export function HowToPlayScreen({ navigation }) {
  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inner}>
          <Heading>Hur spelar man?</Heading>
          <Paragraph>
            Eu et aliquip magna consequat incididunt duis non velit sunt nostrud ex ullamco. Adipisicing qui consectetur
            voluptate eu officia velit mollit dolor sit nisi id nostrud. Sunt eu ex proident velit ea id nostrud
            reprehenderit occaecat ipsum excepteur sint amet. Magna irure adipisicing quis et proident adipisicing
            aliqua elit elit anim.
          </Paragraph>
          <Paragraph>
            Eu et aliquip magna consequat incididunt duis non velit sunt nostrud ex ullamco. Adipisicing qui consectetur
            voluptate eu officia velit mollit dolor sit nisi id nostrud. Sunt eu ex proident velit ea id nostrud
            reprehenderit occaecat ipsum excepteur sint amet. Magna irure adipisicing quis et proident adipisicing
            aliqua elit elit anim.
          </Paragraph>
          <Paragraph>
            Eu et aliquip magna consequat incididunt duis non velit sunt nostrud ex ullamco. Adipisicing qui consectetur
            voluptate eu officia velit mollit dolor sit nisi id nostrud. Sunt eu ex proident velit ea id nostrud
            reprehenderit occaecat ipsum excepteur sint amet. Magna irure adipisicing quis et proident adipisicing
            aliqua elit elit anim.
          </Paragraph>
          <Button.Primary text="Tillbaka" style={styles.button} onPress={goBack} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
HowToPlayScreen.propTypes = {
  ...screenPropTypes,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inner: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
  button: {
    marginTop: 30,
  },
});
