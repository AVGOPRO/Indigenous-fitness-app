// Nalam — Profile Edit Modal
// Accessible via pen icon on Home header (replaces hibiscus)
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Modal, ScrollView,
  TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { FontSize, FontWeight } from '../../theme/typography';
import useUserStore from '../../store/userStore';
import HealthService from '../../services/healthService';

const ACTIVITY_OPTIONS = [
  { key: 'sedentary', label: 'Sedentary', icon: '🛋️' },
  { key: 'light', label: 'Lightly Active', icon: '🚶' },
  { key: 'moderate', label: 'Moderately Active', icon: '🚴' },
  { key: 'active', label: 'Very Active', icon: '🏃' },
];

const ProfileEditModal = ({ visible, onClose }) => {
  const { profile, saveProfile } = useUserStore();

  const [form, setForm] = useState({
    name: '', age: '', gender: 'female',
    heightCm: '', currentWeight: '', targetWeight: '',
    activityLevel: 'sedentary',
  });

  useEffect(() => {
    if (profile && visible) {
      setForm({
        name: profile.name || '',
        age: String(profile.age || ''),
        gender: profile.gender || 'female',
        heightCm: String(profile.heightCm || ''),
        currentWeight: String(profile.currentWeight || ''),
        targetWeight: String(profile.targetWeight || ''),
        activityLevel: profile.activityLevel || 'sedentary',
      });
    }
  }, [visible, profile]);

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.heightCm || !form.currentWeight) {
      Alert.alert('Missing Fields', 'Please fill in name, height, and current weight.');
      return;
    }
    const weight = parseFloat(form.currentWeight);
    const height = parseFloat(form.heightCm);
    const age = parseInt(form.age);

    const tdee = HealthService.calculateTDEE(weight, height, age, form.gender, form.activityLevel);
    const calorieGoal = HealthService.calculateCalorieGoal(tdee, form.gender);
    const waterGoalGlasses = HealthService.waterGoalGlasses(weight);

    await saveProfile({
      ...profile,
      name: form.name.trim(),
      age,
      gender: form.gender,
      heightCm: height,
      currentWeight: weight,
      // BUG-001 fix: startWeight is the onboarding anchor — NEVER overwrite it from this modal.
      // It represents the weight when the user began their journey.
      startWeight: profile.startWeight,
      targetWeight: parseFloat(form.targetWeight) || profile.targetWeight,
      activityLevel: form.activityLevel,
      calorieGoal,
      waterGoalGlasses,
    });

    Alert.alert('✅ Saved!', 'Your profile has been updated.');
    onClose();
  };

  const inputStyle = [styles.input];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        {/* Header */}
        <LinearGradient colors={Colors.gradientMaroon} style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="chevron-down" size={24} color={Colors.textOnDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.section}>
            {/* Name */}
            <Text style={styles.label}>Your Name</Text>
            <TextInput style={inputStyle} value={form.name} onChangeText={v => update('name', v)}
              placeholder="Your name" placeholderTextColor={Colors.textMuted} />

            {/* Age */}
            <Text style={styles.label}>Age</Text>
            <TextInput style={inputStyle} value={form.age} onChangeText={v => update('age', v)}
              keyboardType="numeric" placeholder="Age" placeholderTextColor={Colors.textMuted} />

            {/* Gender */}
            <Text style={styles.label}>Gender</Text>
            <View style={styles.row}>
              {['female', 'male'].map(g => (
                <TouchableOpacity key={g} onPress={() => update('gender', g)}
                  style={[styles.genderBtn, form.gender === g && styles.genderBtnActive]}>
                  <Text style={[styles.genderText, form.gender === g && styles.genderTextActive]}>
                    {g === 'female' ? '👩 Female' : '👨 Male'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Height */}
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput style={inputStyle} value={form.heightCm} onChangeText={v => update('heightCm', v)}
              keyboardType="numeric" placeholder="e.g. 165" placeholderTextColor={Colors.textMuted} />

            {/* Start weight — read-only anchor, cannot be changed here */}
            {profile?.startWeight && (
              <View style={styles.startWeightBadge}>
                <Ionicons name="flag-outline" size={14} color={Colors.textMuted} />
                <Text style={styles.startWeightText}>
                  Journey start weight: <Text style={styles.startWeightVal}>{profile.startWeight} kg</Text> (set at onboarding, cannot be changed)
                </Text>
              </View>
            )}

            {/* Current weight */}
            <Text style={styles.label}>Current Weight (kg) — update to today's reading</Text>
            <TextInput style={inputStyle} value={form.currentWeight} onChangeText={v => update('currentWeight', v)}
              keyboardType="numeric" placeholder="e.g. 90" placeholderTextColor={Colors.textMuted} />

            {/* Target weight */}
            <Text style={styles.label}>Target Weight (kg)</Text>
            <TextInput style={inputStyle} value={form.targetWeight} onChangeText={v => update('targetWeight', v)}
              keyboardType="numeric" placeholder="e.g. 75" placeholderTextColor={Colors.textMuted} />

            {/* Activity level */}
            <Text style={styles.label}>Activity Level</Text>
            {ACTIVITY_OPTIONS.map(opt => (
              <TouchableOpacity key={opt.key} onPress={() => update('activityLevel', opt.key)}
                style={[styles.activityCard, form.activityLevel === opt.key && styles.activityCardActive]}>
                <Text style={styles.activityIcon}>{opt.icon}</Text>
                <Text style={[styles.activityLabel, form.activityLevel === opt.key && { color: Colors.primary }]}>
                  {opt.label}
                </Text>
                {form.activityLevel === opt.key && (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={{ marginLeft: 'auto' }} />
                )}
              </TouchableOpacity>
            ))}

            {/* Calorie preview */}
            {form.currentWeight && form.heightCm && form.age && (
              <View style={styles.previewCard}>
                <Text style={styles.previewTitle}>📊 Updated Plan Preview</Text>
                {(() => {
                  const w = parseFloat(form.currentWeight);
                  const h = parseFloat(form.heightCm);
                  const a = parseInt(form.age);
                  if (!w || !h || !a) return null;
                  const tdee = HealthService.calculateTDEE(w, h, a, form.gender, form.activityLevel);
                  const goal = HealthService.calculateCalorieGoal(tdee, form.gender);
                  const water = HealthService.waterGoalGlasses(w);
                  const bmi = HealthService.calculateBMI(w, h);
                  const cat = HealthService.getBMICategory(bmi);
                  return (
                    <>
                      <Text style={styles.previewItem}>🔥 Daily Calories: <Text style={styles.previewVal}>{goal} kcal</Text></Text>
                      <Text style={styles.previewItem}>💧 Water Goal: <Text style={styles.previewVal}>{water} glasses</Text></Text>
                      <Text style={styles.previewItem}>📊 BMI: <Text style={[styles.previewVal, { color: cat.color }]}>{bmi} ({cat.label})</Text></Text>
                    </>
                  );
                })()}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 16, paddingBottom: 16, paddingHorizontal: Spacing.base,
  },
  closeBtn: { padding: Spacing.sm },
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  saveBtn: { backgroundColor: Colors.secondary, borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 6 },
  saveBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  scroll: { flex: 1 },
  section: { padding: Spacing.base },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.textSecondary, marginBottom: 6, marginTop: Spacing.md },
  input: { backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, fontSize: FontSize.md, color: Colors.textPrimary, borderWidth: 1.5, borderColor: Colors.sandalwood },
  row: { flexDirection: 'row', gap: Spacing.md },
  genderBtn: { flex: 1, padding: Spacing.md, borderRadius: Radius.lg, backgroundColor: Colors.surface, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.sandalwood },
  genderBtnActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '15' },
  genderText: { fontSize: FontSize.base, color: Colors.textSecondary },
  genderTextActive: { fontWeight: FontWeight.bold, color: Colors.primary },
  activityCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, borderRadius: Radius.lg, borderWidth: 1.5, borderColor: Colors.sandalwood, marginBottom: Spacing.sm, backgroundColor: Colors.surface },
  activityCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  activityIcon: { fontSize: 22 },
  activityLabel: { fontSize: FontSize.base, fontWeight: FontWeight.medium, color: Colors.textPrimary },
  previewCard: { backgroundColor: Colors.primary + '10', borderRadius: Radius.xl, padding: Spacing.base, marginTop: Spacing.base, borderWidth: 1, borderColor: Colors.primary + '30' },
  previewTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary, marginBottom: Spacing.sm },
  previewItem: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 4 },
  previewVal: { fontWeight: FontWeight.bold, color: Colors.textPrimary },
  // BUG-001 fix: read-only start weight chip
  startWeightBadge: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, backgroundColor: Colors.sandalwood + '30', borderRadius: Radius.md, padding: Spacing.sm, marginTop: Spacing.md },
  startWeightText: { flex: 1, fontSize: FontSize.xs, color: Colors.textMuted, lineHeight: 18 },
  startWeightVal: { fontWeight: FontWeight.bold, color: Colors.textSecondary },
});

export default ProfileEditModal;
