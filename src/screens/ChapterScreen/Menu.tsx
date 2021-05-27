import * as React from 'react';
import { useSelector } from 'react-redux';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useT from '../../utils/useT';
import { selectScreen } from '../../store/reducers/screens';
import { selectConfig } from '../../store/reducers/config';
import * as Button from '../../components/Button';
import * as LAYOUT from '../../constants/layout';
import COLORS from '../../constants/colors';
import { ROUTE_NAMES } from '../../constants/routes';
import { Background } from '../../components/Background';

interface Props {
  onDismiss: (route?: typeof ROUTE_NAMES.HOME) => void;
  visible: boolean;
}

export const Menu = ({ onDismiss, visible }: Props) => {
  const insets = useSafeAreaInsets();
  const screen = useSelector(selectScreen('chapter'));
  const { text_color_primary } = useSelector(selectConfig);
  const t = useT(screen?.ui_texts);

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onDismiss}>
      <View style={styles.backDrop}>
        <Background flip style={[styles.container, { paddingBottom: insets.bottom + 30 }]}>
          <View>
            <View style={styles.header}>
              <Pressable onPress={() => onDismiss()} style={styles.closeButton}>
                <Entypo name="cross" size={24} color={text_color_primary} />
              </Pressable>
            </View>
            <Button.Primary
              onPress={() => onDismiss(ROUTE_NAMES.HOME)}
              style={styles.button}
              text={t('menu_go_home')}
              Icon={() => (
                <Entypo name="home" size={24} color={text_color_primary} style={styles.icon} />
              )}
            />
          </View>
          <View>
            <Button.Primary
              onPress={() => onDismiss()}
              style={styles.button}
              text={t('menu_close')}
              Icon={() => (
                <Entypo
                  name="game-controller"
                  size={24}
                  color={text_color_primary}
                  style={styles.icon}
                />
              )}
            />
          </View>
        </Background>
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
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 0,
    paddingHorizontal: LAYOUT.horizontalMargin,
  },
  header: {
    alignItems: 'flex-end',
    paddingVertical: 10,
    marginHorizontal: -10,
  },
  closeButton: {
    padding: 10,
  },
  button: {
    justifyContent: 'flex-start',
    marginBottom: LAYOUT.horizontalMargin,
  },
  icon: {
    marginRight: 10,
  },
});
