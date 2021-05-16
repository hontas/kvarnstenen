import * as React from 'react';
import { useSelector } from 'react-redux';
import { Modal, View, StyleSheet, Pressable, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useT from '../../utils/useT';
import { selectScreen } from '../../store/reducers/screens';
import * as Button from '../../components/Button';
import { ScreenProps } from '../../constants/types';
import COLORS from '../../constants/colors';
import { ROUTE_NAMES } from '../../constants/routes';
import { Heading } from '../../components/Heading';

interface Props extends Pick<ScreenProps, 'navigation'> {
  onDismiss: () => void;
  visible: boolean;
}

export const Menu = ({ navigation, onDismiss, visible }: Props) => {
  const insets = useSafeAreaInsets();
  const screen = useSelector(selectScreen('chapter'));
  const t = useT(screen?.ui_texts);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.backDrop}>
        <Pressable onPress={onDismiss} style={styles.backDropButton}>
          <View style={styles.backDropButton} />
        </Pressable>
        <View style={[styles.container, { paddingBottom: insets.bottom + 30 }]}>
          <Heading level={3}>{t('menu_title')}</Heading>
          <View>
            <Button.Secondary
              onPress={() => {
                navigation.navigate(ROUTE_NAMES.HOME);
                onDismiss();
              }}
              style={styles.button}
            >
              <Entypo name="home" size={24} />
              <Text style={[styles.buttonText, Button.styles.text, Button.styles.secondaryText]}>
                {t('menu_go_home')}
              </Text>
            </Button.Secondary>
          </View>
          <View>
            <Button.Secondary onPress={onDismiss} style={styles.button}>
              <Entypo name="game-controller" size={24} />
              <Text style={[styles.buttonText, Button.styles.text, Button.styles.secondaryText]}>
                {t('menu_close')}
              </Text>
            </Button.Secondary>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    backgroundColor: COLORS.blackTransparent,
    flex: 1,
    justifyContent: 'flex-end',
  },
  backDropButton: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
    marginBottom: 5,
  },
  buttonText: {
    marginLeft: 10,
  },
});
