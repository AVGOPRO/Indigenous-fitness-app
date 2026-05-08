// Nalam — Typography System
// Headings: Serif warmth | Body: Rounded readability

import { StyleSheet, Platform } from 'react-native';
import Colors from './colors';

export const FontFamily = {
  heading: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  body: 'System',
  mono: Platform.OS === 'ios' ? 'Courier' : 'monospace',
};

// Font size scale (Major Third — 1.25 ratio)
export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 20,
  xl: 25,
  xxl: 31,
  xxxl: 39,
  display: 48,
};

export const FontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
};

export const TextStyles = StyleSheet.create({
  displayLarge: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extraBold,
    color: Colors.textPrimary,
    lineHeight: FontSize.xxxl * LineHeight.tight,
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: FontSize.xxl * LineHeight.tight,
  },
  h1: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: FontSize.xl * LineHeight.tight,
  },
  h2: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
    lineHeight: FontSize.lg * LineHeight.normal,
  },
  h3: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    color: Colors.textPrimary,
    lineHeight: FontSize.md * LineHeight.normal,
  },
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * LineHeight.relaxed,
  },
  bodyMedium: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
    lineHeight: FontSize.base * LineHeight.normal,
  },
  caption: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    color: Colors.textMuted,
    lineHeight: FontSize.sm * LineHeight.normal,
  },
  captionBold: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * LineHeight.normal,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  buttonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.5,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.3,
  },
});

export default TextStyles;
