/**
 * SpectraBadge - Badge component for labels like "PRO", "NEW", etc.
 */

import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Colors, Typography, BorderRadius, Spacing} from '@constants';

type BadgeVariant = 'premium' | 'new' | 'popular';
type BadgeSize = 'sm' | 'md';

interface SpectraBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

const SpectraBadge: React.FC<SpectraBadgeProps> = ({
  children,
  variant = 'premium',
  size = 'md',
  style,
}) => {
  const containerStyle: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[size],
    style,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  premium: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  new: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  popular: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  sm: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontWeight: Typography.fontWeight.bold,
    textTransform: 'uppercase',
  },
  premiumText: {
    color: Colors.warning,
  },
  newText: {
    color: Colors.success,
  },
  popularText: {
    color: Colors.brandPurple,
  },
  smText: {
    fontSize: 9,
  },
  mdText: {
    fontSize: 11,
  },
});

export default SpectraBadge;
