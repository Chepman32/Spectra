/**
 * Spectra Design System - Dimensions
 * Common sizes and dimensions used throughout the app
 */

import {Dimensions} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const AppDimensions = {
  screenWidth,
  screenHeight,

  // Header heights
  headerHeight: 64,
  statusBarHeight: 44, // Approximate, use SafeAreaView for precise

  // Button sizes
  buttonHeight: {
    sm: 40,
    md: 48,
    lg: 56,
  },

  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },

  // Thumbnail sizes
  filterThumbnail: {
    width: 100,
    height: 100,
  },

  libraryThumbnail: {
    width: (screenWidth - 4) / 3, // 3 columns with 2px gaps
    height: (screenWidth - 4) / 3,
  },

  // Touch target minimum
  minTouchTarget: 44,

  // Bottom sheet snap points
  bottomSheetSnaps: {
    collapsed: 280,
    medium: 500,
    expanded: screenHeight * 0.9,
  },
};

export default AppDimensions;
