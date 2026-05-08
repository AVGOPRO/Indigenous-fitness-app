// Nalam — Spacing & Layout System (8px base grid)

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 56,
  massive: 72,
};

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

export const Shadow = {
  sm: {
    shadowColor: 'rgba(92, 51, 23, 0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: 'rgba(92, 51, 23, 0.18)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: 'rgba(92, 51, 23, 0.22)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Layout = {
  screenPadding: Spacing.base,
  cardPadding: Spacing.base,
  sectionGap: Spacing.xxl,
  itemGap: Spacing.md,
};

export default { Spacing, Radius, Shadow, Layout };
