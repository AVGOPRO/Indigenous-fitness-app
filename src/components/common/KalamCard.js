// Nalam — KalamCard (Styled Card with South Indian arch border motif)
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';

const KalamCard = ({
  children,
  style,
  accentColor,
  noPadding = false,
  elevated = true,
  borderLeft = false,
}) => {
  return (
    <View style={[
      styles.card,
      elevated && Shadow.md,
      borderLeft && { borderLeftWidth: 4, borderLeftColor: accentColor || Colors.primary },
      noPadding && { padding: 0 },
      style,
    ]}>
      {children}
    </View>
  );
};

// Decorative kolam-inspired top bar
export const KalamCardHeader = ({ children, style, bgColor }) => (
  <View style={[styles.header, bgColor && { backgroundColor: bgColor }, style]}>
    {children}
  </View>
);

// Section divider with kolam dot pattern
export const KolamDivider = ({ style }) => (
  <View style={[styles.divider, style]}>
    {[0, 1, 2, 3, 4, 5, 6].map(i => (
      <View
        key={i}
        style={[
          styles.dot,
          i % 2 === 0 ? styles.dotLarge : styles.dotSmall,
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginVertical: Spacing.md,
  },
  dot: {
    borderRadius: Radius.full,
    backgroundColor: Colors.sandalwood,
  },
  dotLarge: {
    width: 8,
    height: 8,
  },
  dotSmall: {
    width: 4,
    height: 4,
    backgroundColor: Colors.primaryLight,
  },
});

export default KalamCard;
