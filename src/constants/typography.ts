/**
 * Spectra Design System - Typography
 * Using SF Pro (iOS system font)
 */

export const Typography = {
  // Font Families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Font Sizes
  fontSize: {
    display: 34,
    h1: 28,
    h2: 22,
    h3: 18,
    body: 16,
    bodySmall: 14,
    caption: 12,
    label: 11,
  },

  // Font Weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
    light: '300' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 1.5,
    wider: 4,
  },

  // Text Styles (pre-configured combinations)
  styles: {
    display: {
      fontSize: 34,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h1: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    label: {
      fontSize: 11,
      fontWeight: '500' as const,
      letterSpacing: 1,
      textTransform: 'uppercase' as const,
    },
  },
};

export default Typography;
