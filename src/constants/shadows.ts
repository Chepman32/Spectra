/**
 * Spectra Design System - Shadows & Elevation
 * iOS-style shadows
 */

import {ViewStyle} from 'react-native';

export const Shadows: Record<string, ViewStyle> = {
  shadow1: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shadow2: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  shadow3: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  shadow4: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

// Skia shadow definitions for use with React Native Skia
export const SkiaShadows = {
  shadow1: {
    dx: 0,
    dy: 2,
    blur: 4,
    color: 'rgba(0,0,0,0.1)',
  },
  shadow2: {
    dx: 0,
    dy: 4,
    blur: 8,
    color: 'rgba(0,0,0,0.15)',
  },
  shadow3: {
    dx: 0,
    dy: 8,
    blur: 16,
    color: 'rgba(0,0,0,0.2)',
  },
  shadow4: {
    dx: 0,
    dy: 16,
    blur: 32,
    color: 'rgba(0,0,0,0.25)',
  },
};

export default Shadows;
