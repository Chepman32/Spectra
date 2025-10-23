/**
 * Splash Screen - Initial loading screen with animation
 */

import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography} from '@constants';
import type {SplashScreenProps} from '@navigation/types';

const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo entrance
    logoOpacity.value = withDelay(
      300,
      withTiming(1, {duration: 600}),
    );
    logoScale.value = withDelay(
      300,
      withSpring(1, {damping: 15, stiffness: 90}),
    );

    // Animate tagline
    taglineOpacity.value = withDelay(
      800,
      withTiming(1, {duration: 400}),
    );

    // Navigate to Home after animation
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 2500);

    return () => clearTimeout(timeout);
  }, [navigation]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{scale: logoScale.value}],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <LinearGradient
      colors={['#1A0B2E', '#0F0F0F']}
      style={styles.container}>
      <Animated.Text style={[styles.logo, logoAnimatedStyle]}>
        SPECTRA
      </Animated.Text>
      <Animated.Text style={[styles.tagline, taglineAnimatedStyle]}>
        Transform Every Moment
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
