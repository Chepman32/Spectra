/**
 * Navigation Types - Type definitions for React Navigation
 */

import type {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  FilterStudio: {imageUri?: string};
  Library: undefined;
  Settings: undefined;
  PremiumUnlock: undefined;
};

// Screen props types
export type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
export type FilterStudioScreenProps = StackScreenProps<RootStackParamList, 'FilterStudio'>;
export type LibraryScreenProps = StackScreenProps<RootStackParamList, 'Library'>;
export type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;
export type PremiumUnlockScreenProps = StackScreenProps<RootStackParamList, 'PremiumUnlock'>;

// Navigation prop type
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
