// Nalam — Onboarding Screen
// Sprint 3: validation rules for name, age, height, weight, target weight
import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, Alert, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { FontSize, FontWeight } from '../theme/typography';
import useUserStore from '../store/userStore';
import HealthService from '../services/healthService';

const { width } = Dimensions.get('window');

const STEPS = [
  { id: 'welcome',  title: 'Vanakkam! 🙏',           subtitle: "Let's set up your wellness journey" },
  { id: 'personal', title: 'About You',               subtitle: 'Help us personalize your plan' },
  { id: 'body',     title: 'Your Body',               subtitle: 'Calculate your ideal calorie goal' },
  { id: 'goal',     title: 'Your Goal',               subtitle: 'Where do you want to be?' },
  { id: 'activity', title: 'Activity Level',          subtitle: 'How active are you currently?' },
  { id: 'summary',  title: 'Your Plan is Ready! 🎉', subtitle: 'Customized just for you' },
];

const ACTIVITY_OPTIONS = [
  { key: 'sedentary', label: 'Sedentary',          icon: '🛋️', desc: 'Little or no exercise' },
  { key: 'light',     label: 'Lightly Active',     icon: '🚶', desc: '1–3 days/week walking' },
  { key: 'moderate',  label: 'Moderately Active',  icon: '🚴', desc: 'Exercise 3–5 days/week' },
  { key: 'active',    label: 'Very Active',        icon: '🏃', desc: 'Hard exercise 6–7 days' },
];

// ─── Validation rules ──────────────────────────────────────────────────────
const RULES = {
  name: {
    minLen: 3,
    maxLen: 14,
    // Only letters and spaces
    pattern: /^[a-zA-Z\s]+$/,
  },
  age:          { min: 10,  max: 80  },
  height:       { min: 100, max: 220 },
  weight:       { min: 50,  max: 200 },
  targetWeight: { min: 30,  max: 200 }, // hard floor, real check vs startWeight done in validate
};

// Returns null if valid, error string if not
const validateStep1 = (form) => {
  const name = form.name.trim();
  if (!name) return 'Please enter your name.';
  if (!RULES.name.pattern.test(name))
    return 'Name can only contain letters and spaces.';
  if (name.length < RULES.name.minLen)
    return `Name must be at least ${RULES.name.minLen} characters.`;
  if (name.length > RULES.name.maxLen)
    return `Name cannot exceed ${RULES.name.maxLen} characters (including spaces).`;

  if (!form.age) return 'Please enter your age.';
  const age = parseInt(form.age);
  if (isNaN(age) || age < RULES.age.min || age > RULES.age.max)
    return `Age must be between ${RULES.age.min} and ${RULES.age.max} years.`;

  return null;
};

const validateStep2 = (form) => {
  if (!form.heightCm) return 'Please enter your height.';
  const h = parseFloat(form.heightCm);
  if (isNaN(h) || h < RULES.height.min || h > RULES.height.max)
    return `Height must be between ${RULES.height.min} cm and ${RULES.height.max} cm.`;

  if (!form.startWeight) return 'Please enter your current weight.';
  const w = parseFloat(form.startWeight);
  if (isNaN(w) || w < RULES.weight.min || w > RULES.weight.max)
    return `Current weight must be between ${RULES.weight.min} kg and ${RULES.weight.max} kg.`;

  return null;
};

const validateStep3 = (form) => {
  if (!form.targetWeight) return 'Please enter your target weight.';
  const tw = parseFloat(form.targetWeight);
  const sw = parseFloat(form.startWeight);

  if (isNaN(tw) || tw < RULES.targetWeight.min || tw > RULES.weight.max)
    return `Target weight must be between ${RULES.targetWeight.min} kg and ${RULES.weight.max} kg.`;

  if (tw > sw)
    return `Target weight (${tw} kg) cannot be higher than your current weight (${sw} kg).`;

  return null;
};

// Inline field error component
const FieldError = ({ message }) =>
  message ? (
    <View style={styles.errorRow}>
      <Ionicons name="alert-circle" size={13} color={Colors.error || '#C8402A'} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  ) : null;

const OnboardingScreen = ({ navigation }) => {
  const [step, setStep]   = useState(0);
  const [errors, setErrors] = useState({});
  const [form, setForm]   = useState({
    name: '', age: '', gender: 'female',
    heightCm: '', startWeight: '', targetWeight: '',
    activityLevel: 'sedentary',
  });
  const saveProfile = useUserStore(s => s.saveProfile);

  const update = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    // Clear field error on change
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validateAndNext = () => {
    let error = null;

    if (step === 1) error = validateStep1(form);
    if (step === 2) error = validateStep2(form);
    if (step === 3) error = validateStep3(form);

    if (error) {
      Alert.alert('Please check your input', error);
      return;
    }
    if (step < STEPS.length - 1) setStep(prev => prev + 1);
  };

  const handleFinish = async () => {
    const tdee = HealthService.calculateTDEE(
      parseFloat(form.startWeight), parseFloat(form.heightCm),
      parseInt(form.age), form.gender, form.activityLevel
    );
    await saveProfile({
      name:               form.name.trim(),
      age:                parseInt(form.age),
      gender:             form.gender,
      heightCm:           parseFloat(form.heightCm),
      startWeight:        parseFloat(form.startWeight),
      currentWeight:      parseFloat(form.startWeight),
      targetWeight:       parseFloat(form.targetWeight),
      activityLevel:      form.activityLevel,
      calorieGoal:        HealthService.calculateCalorieGoal(tdee, form.gender),
      waterGoalGlasses:   HealthService.waterGoalGlasses(parseFloat(form.startWeight)),
      onboardingDate:     new Date().toISOString(),
      onboardingComplete: true,
    });
  };

  // Computed summary values
  const tdee = form.startWeight && form.heightCm && form.age
    ? HealthService.calculateTDEE(
        parseFloat(form.startWeight), parseFloat(form.heightCm),
        parseInt(form.age), form.gender, form.activityLevel)
    : 0;
  const calorieGoal = tdee ? HealthService.calculateCalorieGoal(tdee, form.gender) : 0;
  const bmi   = form.startWeight && form.heightCm
    ? HealthService.calculateBMI(parseFloat(form.startWeight), parseFloat(form.heightCm)) : 0;
  const weeks = form.startWeight && form.targetWeight &&
                parseFloat(form.targetWeight) < parseFloat(form.startWeight)
    ? HealthService.estimateWeeksToGoal(parseFloat(form.startWeight), parseFloat(form.targetWeight)) : 0;
  const duration = HealthService.formatDuration(weeks);
  const bmiCat = bmi ? HealthService.getBMICategory(bmi) : null;

  // Live name length counter for step 1
  const nameLen = form.name.length;
  const nameLenColor = nameLen > RULES.name.maxLen
    ? (Colors.error || '#C8402A')
    : nameLen >= RULES.name.maxLen - 2
      ? '#E8A020'
      : Colors.textMuted;

  const isLastStep = step === STEPS.length - 1;

  return (
    <LinearGradient colors={Colors.gradientMaroon} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={styles.logoArea}>
            <Text style={styles.appName}>நலம்</Text>
            <Text style={styles.appNameEn}>NALAM</Text>
          </View>

          {/* Step indicator */}
          <View style={styles.stepDots}>
            {STEPS.map((_, i) => (
              <View key={i} style={[styles.dot, i <= step && styles.dotActive, i === step && styles.dotCurrent]} />
            ))}
          </View>

          {/* Step card */}
          <View style={styles.card}>
            <Text style={styles.stepTitle}>{STEPS[step].title}</Text>
            <Text style={styles.stepSubtitle}>{STEPS[step].subtitle}</Text>

            {/* STEP 0 — Welcome */}
            {step === 0 && (
              <View style={styles.welcomeContent}>
                <Text style={styles.welcomeEmoji}>🌺</Text>
                <Text style={styles.welcomeText}>
                  Nalam is your personal South Indian wellness companion — guiding you to lose weight naturally,
                  eat wholesome food, move joyfully, and find peace within.
                </Text>
                <Text style={styles.welcomeText}>
                  No shortcuts. No supplements. Just you, your body, and the wisdom of our traditions.
                </Text>
              </View>
            )}

            {/* STEP 1 — Personal Info */}
            {step === 1 && (
              <View>
                {/* Name */}
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Your Name</Text>
                  <Text style={[styles.charCount, { color: nameLenColor }]}>
                    {nameLen}/{RULES.name.maxLen}
                  </Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Shilpa Arvind"
                  placeholderTextColor={Colors.textMuted}
                  value={form.name}
                  maxLength={RULES.name.maxLen}
                  autoCapitalize="words"
                  onChangeText={v => update('name', v)}
                />
                <Text style={styles.hint}>
                  3–{RULES.name.maxLen} characters, letters only
                </Text>

                {/* Age */}
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 29"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  value={form.age}
                  maxLength={2}
                  onChangeText={v => update('age', v.replace(/[^0-9]/g, ''))}
                />
                <Text style={styles.hint}>Between {RULES.age.min} and {RULES.age.max} years</Text>

                {/* Gender */}
                <Text style={styles.label}>Gender</Text>
                <View style={styles.genderRow}>
                  {['female', 'male'].map(g => (
                    <TouchableOpacity key={g} onPress={() => update('gender', g)}
                      style={[styles.genderBtn, form.gender === g && styles.genderBtnActive]}>
                      <Text style={[styles.genderText, form.gender === g && styles.genderTextActive]}>
                        {g === 'female' ? '👩 Female' : '👨 Male'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* STEP 2 — Body Measurements */}
            {step === 2 && (
              <View>
                <Text style={styles.label}>Height (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 165"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  value={form.heightCm}
                  maxLength={3}
                  onChangeText={v => update('heightCm', v.replace(/[^0-9]/g, ''))}
                />
                <Text style={styles.hint}>Between {RULES.height.min} cm and {RULES.height.max} cm</Text>

                <Text style={styles.label}>Current Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 85"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  value={form.startWeight}
                  maxLength={3}
                  onChangeText={v => update('startWeight', v.replace(/[^0-9]/g, ''))}
                />
                <Text style={styles.hint}>Between {RULES.weight.min} kg and {RULES.weight.max} kg</Text>

                {form.startWeight && form.heightCm &&
                  parseFloat(form.heightCm) >= RULES.height.min &&
                  parseFloat(form.startWeight) >= RULES.weight.min && (
                  <View style={styles.calcPreview}>
                    <Text style={styles.calcText}>
                      BMI:{' '}
                      <Text style={{ fontWeight: FontWeight.bold, color: bmiCat?.color }}>
                        {bmi} ({bmiCat?.label})
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* STEP 3 — Goal */}
            {step === 3 && (
              <View>
                <Text style={styles.label}>Target Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 70"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  value={form.targetWeight}
                  maxLength={3}
                  onChangeText={v => update('targetWeight', v.replace(/[^0-9]/g, ''))}
                />
                <Text style={styles.hint}>
                  Equal to or lower than your current weight ({form.startWeight} kg)
                </Text>

                {/* Live preview — only show when target is valid */}
                {form.targetWeight && form.startWeight &&
                  parseFloat(form.targetWeight) <= parseFloat(form.startWeight) &&
                  parseFloat(form.targetWeight) >= RULES.targetWeight.min && (
                  <View style={styles.calcPreview}>
                    <Text style={styles.calcText}>
                      To lose:{' '}
                      <Text style={{ fontWeight: FontWeight.bold, color: Colors.primary }}>
                        {(parseFloat(form.startWeight) - parseFloat(form.targetWeight)).toFixed(1)} kg
                      </Text>
                    </Text>
                    <Text style={styles.calcText}>
                      Estimated time:{' '}
                      <Text style={{ fontWeight: FontWeight.bold, color: Colors.primary }}>
                        {duration.label}
                      </Text>
                    </Text>
                    <Text style={[styles.calcText, { marginTop: 6, fontStyle: 'italic', color: Colors.accent }]}>
                      💪 Exercises get harder week by week — and that's exactly what makes it work!
                    </Text>
                  </View>
                )}

                {/* Warn if target > start */}
                {form.targetWeight && form.startWeight &&
                  parseFloat(form.targetWeight) > parseFloat(form.startWeight) && (
                  <View style={styles.warnBox}>
                    <Ionicons name="warning" size={14} color="#E8A020" />
                    <Text style={styles.warnText}>
                      Target weight cannot be higher than your current weight
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* STEP 4 — Activity */}
            {step === 4 && (
              <View>
                {ACTIVITY_OPTIONS.map(opt => (
                  <TouchableOpacity key={opt.key} onPress={() => update('activityLevel', opt.key)}
                    style={[styles.activityCard, form.activityLevel === opt.key && styles.activityCardActive]}>
                    <Text style={styles.activityIcon}>{opt.icon}</Text>
                    <View style={styles.activityText}>
                      <Text style={[styles.activityLabel, form.activityLevel === opt.key && { color: Colors.primary }]}>
                        {opt.label}
                      </Text>
                      <Text style={styles.activityDesc}>{opt.desc}</Text>
                    </View>
                    {form.activityLevel === opt.key && (
                      <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* STEP 5 — Summary */}
            {step === 5 && (
              <View>
                <Text style={styles.summaryGreet}>You're all set, {form.name.trim()}! 🌺</Text>
                {[
                  { label: '🎯 Daily Calorie Goal',  value: `${calorieGoal} kcal` },
                  { label: '💧 Daily Water Goal',    value: `${HealthService.waterGoalGlasses(parseFloat(form.startWeight))} glasses` },
                  { label: '📊 Current BMI',         value: `${bmi} (${bmiCat?.label})` },
                  { label: '⏱️ Estimated Duration',  value: duration.label },
                  { label: '📅 Total Weeks',         value: `~${weeks} weeks` },
                  { label: '📉 To Lose',             value: `${(parseFloat(form.startWeight) - parseFloat(form.targetWeight)).toFixed(1)} kg` },
                  { label: '🔥 Training Phases',     value: 'Beginner → Intermediate → Advanced' },
                ].map((item, i) => (
                  <View key={i} style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>{item.label}</Text>
                    <Text style={styles.summaryValue}>{item.value}</Text>
                  </View>
                ))}
                <Text style={styles.summaryNote}>
                  Your exercises get harder every 4 weeks — that's your body growing stronger. Nalam will guide you every step of the way. 🙏
                </Text>
              </View>
            )}

            {/* Navigation */}
            <View style={styles.navRow}>
              <TouchableOpacity
                onPress={isLastStep ? handleFinish : validateAndNext}
                style={[styles.nextBtn, { marginLeft: 'auto' }]}
              >
                <Text style={styles.nextText}>
                  {isLastStep ? 'Begin My Journey 🌟' : step === 0 ? "Let's Go!" : 'Continue'}
                </Text>
                {!isLastStep && (
                  <Ionicons name="arrow-forward" size={18} color={Colors.white} style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient:       { flex: 1 },
  flex:           { flex: 1 },
  scroll:         { flexGrow: 1, padding: Spacing.base, paddingTop: 60 },
  logoArea:       { alignItems: 'center', marginBottom: Spacing.lg },
  appName:        { fontSize: FontSize.xxxl, fontWeight: FontWeight.extraBold, color: Colors.white, letterSpacing: 2 },
  appNameEn:      { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.sandalwood, letterSpacing: 8, marginTop: -4 },
  stepDots:       { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: Spacing.lg },
  dot:            { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.maroonLight + '50' },
  dotActive:      { backgroundColor: Colors.sandalwood },
  dotCurrent:     { width: 20, backgroundColor: Colors.primary },
  card:           { backgroundColor: Colors.surface, borderRadius: Radius.xxl, padding: Spacing.xl, ...Shadow.lg },
  stepTitle:      { fontSize: FontSize.xl, fontWeight: FontWeight.extraBold, color: Colors.maroon, marginBottom: 4 },
  stepSubtitle:   { fontSize: FontSize.sm, color: Colors.textMuted, marginBottom: Spacing.lg },
  welcomeContent: { alignItems: 'center' },
  welcomeEmoji:   { fontSize: 64, marginBottom: Spacing.md },
  welcomeText:    { fontSize: FontSize.base, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.md },
  labelRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.md, marginBottom: 6 },
  label:          { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.textSecondary, marginBottom: 6, marginTop: Spacing.md },
  charCount:      { fontSize: FontSize.xs, fontWeight: FontWeight.medium },
  input:          { backgroundColor: Colors.background, borderRadius: Radius.md, padding: Spacing.md, fontSize: FontSize.md, color: Colors.textPrimary, borderWidth: 1.5, borderColor: Colors.sandalwood },
  hint:           { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4, marginBottom: 2, paddingLeft: 2 },
  errorRow:       { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  errorText:      { fontSize: FontSize.xs, color: Colors.error || '#C8402A', flex: 1 },
  warnBox:        { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E8A02015', borderRadius: Radius.sm, padding: Spacing.sm, marginTop: Spacing.sm },
  warnText:       { fontSize: FontSize.xs, color: '#E8A020', flex: 1 },
  genderRow:      { flexDirection: 'row', gap: Spacing.md, marginTop: 4 },
  genderBtn:      { flex: 1, padding: Spacing.md, borderRadius: Radius.lg, backgroundColor: Colors.background, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.sandalwood },
  genderBtnActive:{ borderColor: Colors.primary, backgroundColor: Colors.primary + '15' },
  genderText:     { fontSize: FontSize.base, color: Colors.textSecondary },
  genderTextActive:{ fontWeight: FontWeight.bold, color: Colors.primary },
  calcPreview:    { backgroundColor: Colors.sandalwood + '50', borderRadius: Radius.md, padding: Spacing.md, marginTop: Spacing.md },
  calcText:       { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 4 },
  activityCard:   { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, padding: Spacing.md, borderRadius: Radius.lg, borderWidth: 1.5, borderColor: Colors.sandalwood, marginBottom: Spacing.sm, backgroundColor: Colors.background },
  activityCardActive:{ borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  activityIcon:   { fontSize: 28 },
  activityText:   { flex: 1 },
  activityLabel:  { fontSize: FontSize.base, fontWeight: FontWeight.semiBold, color: Colors.textPrimary },
  activityDesc:   { fontSize: FontSize.sm, color: Colors.textMuted },
  summaryGreet:   { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary, marginBottom: Spacing.md, textAlign: 'center' },
  summaryRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.sandalwood },
  summaryLabel:   { fontSize: FontSize.sm, color: Colors.textSecondary },
  summaryValue:   { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.maroon },
  summaryNote:    { marginTop: Spacing.base, fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', fontStyle: 'italic' },
  navRow:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xl },
  nextBtn:        { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md, borderRadius: Radius.full, ...Shadow.sm },
  nextText:       { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.white },
});

export default OnboardingScreen;
