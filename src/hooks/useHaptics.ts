/**
 * useHaptics - Hook for haptic feedback
 */

import {useCallback} from 'react';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {useAppStore} from '@store';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const useHaptics = () => {
  const hapticEnabled = useAppStore(state => state.preferences.hapticEnabled);

  const triggerLight = useCallback(() => {
    if (!hapticEnabled) return;
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  }, [hapticEnabled]);

  const triggerMedium = useCallback(() => {
    if (!hapticEnabled) return;
    ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
  }, [hapticEnabled]);

  const triggerHeavy = useCallback(() => {
    if (!hapticEnabled) return;
    ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
  }, [hapticEnabled]);

  const triggerSelection = useCallback(() => {
    if (!hapticEnabled) return;
    ReactNativeHapticFeedback.trigger('selection', hapticOptions);
  }, [hapticEnabled]);

  const triggerNotification = useCallback((type: 'success' | 'warning' | 'error' = 'success') => {
    if (!hapticEnabled) return;
    ReactNativeHapticFeedback.trigger(`notification${type.charAt(0).toUpperCase() + type.slice(1)}` as any, hapticOptions);
  }, [hapticEnabled]);

  return {
    light: triggerLight,
    medium: triggerMedium,
    heavy: triggerHeavy,
    selection: triggerSelection,
    notification: triggerNotification,
  };
};

export default useHaptics;
