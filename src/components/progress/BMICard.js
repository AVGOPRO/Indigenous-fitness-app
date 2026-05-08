// Nalam — BMI Card Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { FontSize, FontWeight } from '../../theme/typography';
import HealthService from '../../services/healthService';
import { Formatters } from '../../utils/formatters';

const BMICard = ({ weightKg, heightCm }) => {
  const bmi = HealthService.calculateBMI(weightKg, heightCm);
  const category = HealthService.getBMICategory(bmi);
  const idealRange = HealthService.getIdealWeightRange(heightCm);

  // BMI scale 15–40 for display bar
  const bmiMin = 15, bmiMax = 40;
  const position = Math.min(1, Math.max(0, (bmi - bmiMin) / (bmiMax - bmiMin)));

  const zones = [
    { label: 'Under', color: Colors.bmiUnderweight, from: 15, to: 18.5 },
    { label: 'Normal', color: Colors.bmiNormal, from: 18.5, to: 25 },
    { label: 'Over', color: Colors.bmiOverweight, from: 25, to: 30 },
    { label: 'Obese', color: Colors.bmiObese, from: 30, to: 40 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Body Mass Index</Text>
          <Text style={styles.subtitle}>Based on current weight</Text>
        </View>
        <View style={[styles.bmiChip, { backgroundColor: category.color + '20', borderColor: category.color }]}>
          <Text style={[styles.bmiValue, { color: category.color }]}>{Formatters.bmi(bmi)}</Text>
          <Text style={[styles.bmiLabel, { color: category.color }]}>{category.label}</Text>
        </View>
      </View>

      {/* BMI scale bar */}
      <View style={styles.scaleContainer}>
        <View style={styles.scaleBar}>
          {zones.map((zone, i) => {
            const width = ((zone.to - zone.from) / (bmiMax - bmiMin)) * 100;
            return (
              <View key={i} style={[styles.zoneSegment, { width: `${width}%`, backgroundColor: zone.color + '50' }]}>
                <Text style={[styles.zoneLabel, { color: zone.color }]}>{zone.label}</Text>
              </View>
            );
          })}
          {/* Indicator */}
          <View style={[styles.indicator, { left: `${position * 96}%`, backgroundColor: category.color }]} />
        </View>
        <View style={styles.scaleLabels}>
          <Text style={styles.scaleNum}>15</Text>
          <Text style={styles.scaleNum}>18.5</Text>
          <Text style={styles.scaleNum}>25</Text>
          <Text style={styles.scaleNum}>30</Text>
          <Text style={styles.scaleNum}>40</Text>
        </View>
      </View>

      {/* Ideal weight */}
      <View style={styles.idealRow}>
        <Text style={styles.idealText}>
          🎯 Ideal weight for your height:{' '}
          <Text style={styles.idealValue}>{idealRange.min}kg – {idealRange.max}kg</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    ...Shadow.sm,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bmiChip: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
  },
  bmiValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extraBold,
  },
  bmiLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
  },
  scaleContainer: {
    marginBottom: Spacing.md,
  },
  scaleBar: {
    flexDirection: 'row',
    height: 32,
    borderRadius: Radius.sm,
    overflow: 'visible',
    position: 'relative',
    marginBottom: 4,
  },
  zoneSegment: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  zoneLabel: {
    fontSize: 8,
    fontWeight: FontWeight.bold,
  },
  indicator: {
    position: 'absolute',
    top: -4,
    width: 4,
    height: 40,
    borderRadius: Radius.full,
    zIndex: 10,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scaleNum: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  idealRow: {
    backgroundColor: Colors.accentLight + '20',
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },
  idealText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  idealValue: {
    fontWeight: FontWeight.bold,
    color: Colors.accent,
  },
});

export default BMICard;
