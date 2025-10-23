/**
 * ToastContainer - Visual toast component with animations
 */

import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {Colors, Typography, BorderRadius, Shadows, Spacing} from '@constants';
import type {ToastConfig} from './ToastContext';

interface ToastContainerProps extends ToastConfig {
  visible: boolean;
  onDismiss: () => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  message,
  type = 'info',
  position = 'bottom',
  action,
  icon,
  visible,
  onDismiss,
}) => {
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {damping: 15, stiffness: 100});
      opacity.value = withTiming(1, {duration: 200});
    } else {
      translateY.value = withTiming(position === 'top' ? -100 : 100, {
        duration: 200,
      });
      opacity.value = withTiming(0, {duration: 200});
    }
  }, [visible, position]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  const getIconName = () => {
    if (icon) return icon;
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'alert-circle';
      case 'warning':
        return 'alert-triangle';
      case 'info':
      default:
        return 'info';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return Colors.success;
      case 'error':
        return Colors.error;
      case 'warning':
        return Colors.warning;
      case 'info':
      default:
        return Colors.info;
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        position === 'top' ? styles.top : styles.bottom,
      ]}
      pointerEvents="box-none">
      <Animated.View style={[styles.toast, animatedStyle]}>
        <View style={styles.content}>
          <Icon
            name={getIconName()}
            size={20}
            color={getIconColor()}
            style={styles.icon}
          />
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
          {action && (
            <TouchableOpacity onPress={action.onPress} style={styles.action}>
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
            <Icon name="x" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
  toast: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    ...Shadows.shadow3,
    borderWidth: 1,
    borderColor: Colors.border,
    maxWidth: 400,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  message: {
    ...Typography.styles.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  action: {
    marginLeft: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  actionText: {
    ...Typography.styles.body,
    color: Colors.brandPurple,
    fontWeight: Typography.fontWeight.semibold,
  },
  closeButton: {
    marginLeft: Spacing.sm,
    padding: 4,
  },
});

export default ToastContainer;
