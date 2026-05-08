// Nalam v2 — Teal & Gold Color System
// Inspired by the splash screen: dark teal background + golden kolam light

export const Colors = {
  // ─── Primary: Deep Teal ───────────────────────────
  primary: '#1B8A8F',
  primaryLight: '#4DBABF',
  primaryDark: '#0D5459',

  // ─── Secondary: Saffron Gold ──────────────────────
  secondary: '#D4A843',
  secondaryLight: '#F0C860',
  secondaryDark: '#A07820',

  // ─── Accent: Warm Gold glow ───────────────────────
  accent: '#C8963C',
  accentLight: '#F0C860',
  accentDark: '#8A6020',

  // ─── Deep Teal (was maroon — kept name for compat) ─
  maroon: '#0A3840',
  maroonLight: '#1E5C66',

  // ─── Backgrounds ──────────────────────────────────
  background: '#F2EDE3',        // Warm ivory — contrast to teal
  backgroundDark: '#071E22',    // Very dark teal night
  surface: '#FAFAF7',           // Clean card surface
  surfaceDark: '#0D3038',       // Dark card

  // ─── Neutrals ─────────────────────────────────────
  sandalwood: '#C8B897',        // Warm sand — divider / border
  teak: '#3A5A5E',              // Muted teal text
  earthen: '#7A6040',           // Earthy mid-tone

  // ─── Text ─────────────────────────────────────────
  textPrimary: '#0A2C30',
  textSecondary: '#2E5055',
  textMuted: '#7A9298',
  textOnDark: '#F2EDE3',

  // ─── Status ───────────────────────────────────────
  success: '#2E9E7A',
  warning: '#D4A843',
  error: '#C84040',
  info: '#1B8A8F',

  // ─── Calorie zones ────────────────────────────────
  calorieLow: '#2E9E7A',
  calorieMid: '#D4A843',
  calorieHigh: '#C84040',

  // ─── BMI zones ────────────────────────────────────
  bmiUnderweight: '#4A90A4',
  bmiNormal: '#2E9E7A',
  bmiOverweight: '#D4A843',
  bmiObese: '#C84040',

  // ─── Water tracker ────────────────────────────────
  waterFill: '#1B8A8F',
  waterEmpty: '#C8E8EA',

  // ─── Gradients ────────────────────────────────────
  gradientPrimary: ['#1B8A8F', '#0D5459'],
  gradientAccent:  ['#D4A843', '#F0C860'],
  gradientSurface: ['#FAFAF7', '#F2EDE3'],
  gradientDark:    ['#0D3038', '#071E22'],
  gradientMaroon:  ['#0A3840', '#1E5C66'],   // compat alias — now teal
  gradientGold:    ['#C8963C', '#F0C860'],

  // ─── Rangoli Glow (touch illumination) ───────────
  glowGold: 'rgba(212, 168, 67, 0.4)',
  glowTeal: 'rgba(27, 138, 143, 0.35)',
  glowWhite: 'rgba(255, 255, 255, 0.15)',

  // ─── Shadows ──────────────────────────────────────
  shadow: 'rgba(10, 56, 64, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.35)',

  // ─── Tab bar ──────────────────────────────────────
  tabActive: '#D4A843',
  tabInactive: '#7A9298',
  tabBackground: '#FAFAF7',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export default Colors;
