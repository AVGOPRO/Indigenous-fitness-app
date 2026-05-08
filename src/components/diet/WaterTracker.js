// Nalam — Water Tracker Component
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { FontSize, FontWeight } from '../../theme/typography';

const WaterTracker = ({ glasses, goal, onAdd, onRemove }) => {
  const glasses_arr = Array.from({ length: goal }, (_, i) => i < glasses);
  const mlDrunk = glasses * 250;
  const mlGoal = goal * 250;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>💧 Water Intake</Text>
          <Text style={styles.subtitle}>{mlDrunk}ml / {mlGoal}ml</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={onRemove}
            style={[styles.btn, styles.btnMinus]}
            disabled={glasses === 0}
          >
            <Ionicons name="remove" size={18} color={glasses === 0 ? Colors.textMuted : Colors.secondary} />
          </TouchableOpacity>
          <Text style={styles.count}>{glasses}</Text>
          <TouchableOpacity
            onPress={onAdd}
            style={[styles.btn, styles.btnPlus]}
            disabled={glasses >= 20}
          >
            <Ionicons name="add" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Glass grid — Issue #6: cup/glass icon instead of water droplet */}
      <View style={styles.glassGrid}>
        {glasses_arr.map((filled, index) => (
          <View
            key={index}
            style={[styles.glass, filled ? styles.glassFilled : styles.glassEmpty]}
          >
            <Ionicons
              name={filled ? 'cafe' : 'cafe-outline'}
              size={16}
              color={filled ? Colors.waterFill : Colors.textMuted}
            />
          </View>
        ))}
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${Math.min(100, (glasses / goal) * 100)}%` },
          ]}
        />
      </View>

      {glasses >= goal && (
        <Text style={styles.goalReached}>🎉 Daily water goal achieved! Excellent!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.base,
    ...Shadow.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  btn: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnMinus: {
    backgroundColor: Colors.sandalwood,
  },
  btnPlus: {
    backgroundColor: Colors.waterFill,
  },
  count: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.waterFill,
    minWidth: 28,
    textAlign: 'center',
  },
  glassGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  glass: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassFilled: {
    backgroundColor: Colors.waterFill + '30',
    borderWidth: 1,
    borderColor: Colors.waterFill,
  },
  glassEmpty: {
    backgroundColor: Colors.waterEmpty,
    borderWidth: 1,
    borderColor: Colors.sandalwood,
  },
  glassIcon: {
    fontSize: 14,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.waterEmpty,
    borderRadius: Radius.full,
    overflow: 'hidden',
    marginTop: Spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.waterFill,
    borderRadius: Radius.full,
  },
  goalReached: {
    fontSize: FontSize.sm,
    color: Colors.success,
    fontWeight: FontWeight.semiBold,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});

export default WaterTracker;
