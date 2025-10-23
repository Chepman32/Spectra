/**
 * SpectraButton - Core button component
 * Supports multiple variants, sizes, icons, and haptic feedback
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import {Colors, Typography, BorderRadius, Shadows, Spacing} from '@constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';
type HapticType = 'light' | 'medium' | 'heavy';
type IconPosition = 'left' | 'right';

interface SpectraButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: IconPosition;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  haptic?: HapticType;
  style?: ViewStyle;
}

const SpectraButton: React.FC<SpectraButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onPress,
  haptic = 'medium',
  style,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.96, {damping: 15, stiffness: 150});
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {damping: 15, stiffness: 150});
  };

  const handlePress = () => {
    if (disabled || loading) return;

    // Haptic feedback
    const hapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    switch (haptic) {
      case 'light':
        ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
        break;
      case 'medium':
        ReactNativeHapticFeedback.trigger('impactMedium', hapticOptions);
        break;
      case 'heavy':
        ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
        break;
    }

    onPress?.();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
  ];

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;
  const iconColor =
    variant === 'primary'
      ? Colors.white
      : variant === 'secondary'
      ? Colors.textPrimary
      : variant === 'ghost'
      ? Colors.brandPurple
      : Colors.error;

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {icon && iconPosition === 'left' && !loading && (
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.iconLeft}
        />
      )}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.white : Colors.brandPurple}
        />
      ) : (
        <Text style={textStyle}>{children}</Text>
      )}
      {icon && iconPosition === 'right' && !loading && (
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.iconRight}
        />
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <AnimatedTouchable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.9}
        style={[animatedStyle, buttonStyle]}>
        <LinearGradient
          colors={Colors.gradientPrimary}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          angle={45}
          style={styles.gradient}>
          {renderContent()}
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[animatedStyle, buttonStyle]}>
      {renderContent()}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.button,
    overflow: 'hidden',
  },
  primary: {
    ...Shadows.shadow2,
  },
  secondary: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: Colors.error,
  },
  sm: {
    height: 40,
  },
  md: {
    height: 48,
  },
  lg: {
    height: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  text: {
    ...Typography.styles.body,
    fontWeight: Typography.fontWeight.semibold,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.textPrimary,
  },
  ghostText: {
    color: Colors.brandPurple,
  },
  destructiveText: {
    color: Colors.white,
  },
  smText: {
    fontSize: Typography.fontSize.bodySmall,
  },
  mdText: {
    fontSize: Typography.fontSize.body,
  },
  lgText: {
    fontSize: Typography.fontSize.h3,
  },
  disabledText: {
    opacity: 0.7,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});

export default SpectraButton;
