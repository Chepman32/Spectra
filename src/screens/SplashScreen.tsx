/**
 * Splash Screen - Initial loading screen
 * TODO: Implement particle animation with Skia
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Typography} from '@constants';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SPECTRA</Text>
      <Text style={styles.tagline}>Transform Every Moment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: Typography.fontWeight.heavy,
    color: Colors.brandPurple,
    letterSpacing: Typography.letterSpacing.wider,
  },
  tagline: {
    ...Typography.styles.bodySmall,
    color: Colors.textSecondary,
    letterSpacing: Typography.letterSpacing.wide,
    marginTop: 16,
    opacity: 0.7,
  },
});

export default SplashScreen;
