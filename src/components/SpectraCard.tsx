/**
 * SpectraCard - Core card component
 * Container with elevation, radius, and padding variants
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {Colors, BorderRadius, Shadows, Spacing} from '@constants';

type Elevation = 'none' | 'sm' | 'md' | 'lg';
type Radius = 'sm' | 'md' | 'lg' | 'xl';
type Padding = 'none' | 'sm' | 'md' | 'lg';

interface SpectraCardProps {
  children: React.ReactNode;
  elevation?: Elevation;
  radius?: Radius;
  padding?: Padding;
  onPress?: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
}

const SpectraCard: React.FC<SpectraCardProps> = ({
  children,
  elevation = 'md',
  radius = 'md',
  padding = 'md',
  onPress,
  style,
  backgroundColor = Colors.surface,
}) => {
  const cardStyle: ViewStyle[] = [
    styles.base,
    {backgroundColor},
    elevation !== 'none' && styles[`elevation${elevation.toUpperCase()}`],
    {borderRadius: BorderRadius[radius]},
    padding !== 'none' && styles[`padding${padding.toUpperCase()}`],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  elevationSM: {
    ...Shadows.shadow1,
  },
  elevationMD: {
    ...Shadows.shadow2,
  },
  elevationLG: {
    ...Shadows.shadow3,
  },
  paddingSM: {
    padding: Spacing.sm,
  },
  paddingMD: {
    padding: Spacing.md,
  },
  paddingLG: {
    padding: Spacing.lg,
  },
});

export default SpectraCard;
