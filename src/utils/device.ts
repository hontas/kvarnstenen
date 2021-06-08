import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const isIOs = Platform.OS === 'ios';
export const isAndroid = !isIOs;

export const version = Constants.nativeAppVersion;
export const currentVersion = Constants.manifest.version;
export const nativeVersion = Constants.nativeBuildVersion;
