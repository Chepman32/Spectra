/**
 * Spectra Design System - Constants
 * Central export for all design constants
 */

export {Colors} from './colors';
export {Typography} from './typography';
export {Spacing} from './spacing';
export {BorderRadius} from './borderRadius';
export {Shadows, SkiaShadows} from './shadows';
export {AppDimensions} from './dimensions';

// Re-export as a single Theme object for convenience
import {Colors} from './colors';
import {Typography} from './typography';
import {Spacing} from './spacing';
import {BorderRadius} from './borderRadius';
import {Shadows} from './shadows';
import {AppDimensions} from './dimensions';

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  dimensions: AppDimensions,
};

export default Theme;
