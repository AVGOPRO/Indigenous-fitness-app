// Nalam — Progress Screen
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { FontSize, FontWeight } from '../theme/typography';
import useProgressStore from '../store/progressStore';
import useUserStore from '../store/userStore';
import BMICard from '../components/progress/BMICard';
import { Formatters } from '../utils/formatters';
import HealthService from '../services/healthService';

const ProgressScreen = () => {
  const { weightLogs, latestWeight, loadWeightLogs, logWeight, getWeightChange } = useProgressStore();
  const profile = useUserStore(s => s.profile);

  const [newWeight, setNewWeight] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [chartRange, setChartRange] = useState(30);

  useEffect(() => { loadWeightLogs(); }, []);

  const currentWeight = latestWeight || profile?.currentWeight || 0;
  const startWeight = profile?.startWeight || 0;
  const targetWeight = profile?.targetWeight || 0;
  const heightCm = profile?.heightCm || 170;

  const weightLost = Math.max(0, startWeight - currentWeight).toFixed(1);
  const weightLeft = Math.max(0, currentWeight - targetWeight).toFixed(1);
  const progress = HealthService.goalProgress(startWeight, currentWeight, targetWeight);
  const weekChange = getWeightChange(7);

  const handleLogWeight = async () => {
    const w = parseFloat(newWeight);
    if (!w || w < 30 || w > 300) {
      Alert.alert('Invalid Weight', 'Please enter a weight between 30 and 300 kg.');
      return;
    }
    await logWeight(w);
    setNewWeight('');
    setShowInput(false);
  };

  const recentLogs = weightLogs.slice(-chartRange).reverse();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView style={styles.screen}>
        {/* Header */}
        <LinearGradient colors={Colors.gradientMaroon} style={styles.header}>
          <Text style={styles.headerTitle}>📊 Your Progress</Text>
          <View style={styles.headerStats}>
            <View style={styles.hStat}>
              <Text style={styles.hStatVal}>{startWeight} kg</Text>
              <Text style={styles.hStatLabel}>Start</Text>
            </View>
            <View style={styles.hStatArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
            <View style={styles.hStat}>
              <Text style={[styles.hStatVal, { color: Colors.primaryLight }]}>{currentWeight} kg</Text>
              <Text style={styles.hStatLabel}>Now</Text>
            </View>
            <View style={styles.hStatArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
            <View style={styles.hStat}>
              <Text style={styles.hStatVal}>{targetWeight} kg</Text>
              <Text style={styles.hStatLabel}>Goal</Text>
            </View>
          </View>

          {/* Progress bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{progress}% of goal achieved</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Log weight button */}
          {!showInput ? (
            <TouchableOpacity onPress={() => setShowInput(true)}>
              <LinearGradient colors={Colors.gradientPrimary} style={styles.logBtn}>
                <Ionicons name="scale-outline" size={22} color={Colors.white} />
                <Text style={styles.logBtnText}>Log Today's Weight</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.weightInputCard}>
              <Text style={styles.weightInputTitle}>⚖️ Log Weight</Text>
              <View style={styles.weightInputRow}>
                <TextInput
                  style={styles.weightInput}
                  placeholder="e.g. 92.5"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="numeric"
                  value={newWeight}
                  onChangeText={setNewWeight}
                  autoFocus
                />
                <Text style={styles.weightUnit}>kg</Text>
              </View>
              <View style={styles.weightInputBtns}>
                <TouchableOpacity onPress={() => setShowInput(false)} style={styles.cancelBtn}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogWeight} style={styles.saveBtn}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Quick stats */}
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: Colors.accent + '15' }]}>
              <Text style={styles.statVal}>-{weightLost}</Text>
              <Text style={styles.statUnit}>kg</Text>
              <Text style={styles.statLabel}>Total Lost 🎉</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: Colors.primary + '15' }]}>
              <Text style={styles.statVal}>{weightLeft}</Text>
              <Text style={styles.statUnit}>kg</Text>
              <Text style={styles.statLabel}>To Go 🎯</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: (weekChange <= 0 ? Colors.accent : Colors.error) + '15' }]}>
              <Text style={[styles.statVal, { color: weekChange <= 0 ? Colors.accent : Colors.error }]}>
                {weekChange > 0 ? '+' : ''}{weekChange}
              </Text>
              <Text style={styles.statUnit}>kg</Text>
              <Text style={styles.statLabel}>This Week 📅</Text>
            </View>
          </View>

          {/* BMI Card */}
          {currentWeight && heightCm && (
            <BMICard weightKg={currentWeight} heightCm={heightCm} />
          )}

          {/* Weight history */}
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>📈 Weight History</Text>
              <View style={styles.rangeButtons}>
                {[7, 30, 90].map(r => (
                  <TouchableOpacity key={r} onPress={() => setChartRange(r)}
                    style={[styles.rangeBtn, chartRange === r && styles.rangeBtnActive]}>
                    <Text style={[styles.rangeBtnText, chartRange === r && styles.rangeBtnTextActive]}>
                      {r}d
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {recentLogs.length === 0 ? (
              <Text style={styles.emptyHistory}>No weight logs yet. Start logging daily!</Text>
            ) : (
              recentLogs.map((log, i) => {
                const prev = recentLogs[i + 1];
                const change = prev ? (log.weight_kg - prev.weight_kg).toFixed(1) : null;
                const isDown = change && parseFloat(change) < 0;
                return (
                  <View key={log.id} style={styles.logRow}>
                    <Text style={styles.logDate}>{Formatters.shortDate(log.date)}</Text>
                    <View style={styles.logWeightRow}>
                      <Text style={styles.logWeight}>{log.weight_kg} kg</Text>
                      {change && (
                        <Text style={[styles.logChange, { color: isDown ? Colors.accent : Colors.error }]}>
                          {isDown ? '▼' : '▲'} {Math.abs(change)} kg
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })
            )}
          </View>

          {/* Motivation */}
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              {HealthService.getMotivationMessage(parseFloat(weightLost))}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: Spacing.base, paddingBottom: Spacing.xl },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white, marginBottom: Spacing.md },
  headerStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: Spacing.md },
  hStat: { alignItems: 'center' },
  hStatVal: { fontSize: FontSize.lg, fontWeight: FontWeight.extraBold, color: Colors.white },
  hStatLabel: { fontSize: FontSize.xs, color: Colors.sandalwood, marginTop: 2 },
  hStatArrow: {},
  arrowText: { fontSize: FontSize.xl, color: Colors.sandalwood + '80' },
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.full, overflow: 'hidden', marginBottom: 6 },
  progressBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: Radius.full },
  progressText: { fontSize: FontSize.xs, color: Colors.sandalwood, textAlign: 'right' },
  content: { padding: Spacing.base },
  logBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, borderRadius: Radius.full, padding: Spacing.base, marginBottom: Spacing.md },
  logBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  weightInputCard: { backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.base, marginBottom: Spacing.md, ...Shadow.sm },
  weightInputTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  weightInputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  weightInput: { flex: 1, backgroundColor: Colors.background, borderRadius: Radius.md, padding: Spacing.md, fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary, borderWidth: 1.5, borderColor: Colors.sandalwood, textAlign: 'center' },
  weightUnit: { fontSize: FontSize.md, color: Colors.textMuted, fontWeight: FontWeight.medium },
  weightInputBtns: { flexDirection: 'row', gap: Spacing.md },
  cancelBtn: { flex: 1, padding: Spacing.md, borderRadius: Radius.full, backgroundColor: Colors.sandalwood, alignItems: 'center' },
  cancelBtnText: { fontSize: FontSize.base, color: Colors.textSecondary, fontWeight: FontWeight.medium },
  saveBtn: { flex: 1, padding: Spacing.md, borderRadius: Radius.full, backgroundColor: Colors.primary, alignItems: 'center' },
  saveBtnText: { fontSize: FontSize.base, color: Colors.white, fontWeight: FontWeight.bold },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  statCard: { flex: 1, borderRadius: Radius.xl, padding: Spacing.sm, alignItems: 'center' },
  statVal: { fontSize: FontSize.xl, fontWeight: FontWeight.extraBold, color: Colors.textPrimary },
  statUnit: { fontSize: FontSize.xs, color: Colors.textMuted },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center', marginTop: 2 },
  historyCard: { backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.base, ...Shadow.sm, marginBottom: Spacing.md },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  historyTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  rangeButtons: { flexDirection: 'row', gap: 4 },
  rangeBtn: { paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: Radius.full, backgroundColor: Colors.sandalwood },
  rangeBtnActive: { backgroundColor: Colors.primary },
  rangeBtnText: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: FontWeight.semiBold },
  rangeBtnTextActive: { color: Colors.white },
  emptyHistory: { fontSize: FontSize.sm, color: Colors.textMuted, fontStyle: 'italic', textAlign: 'center', paddingVertical: Spacing.md },
  logRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.sandalwood + '50' },
  logDate: { fontSize: FontSize.sm, color: Colors.textMuted },
  logWeightRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  logWeight: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  logChange: { fontSize: FontSize.xs, fontWeight: FontWeight.semiBold },
  motivationCard: { backgroundColor: Colors.primary + '15', borderRadius: Radius.xl, padding: Spacing.base, alignItems: 'center', marginBottom: Spacing.xl },
  motivationText: { fontSize: FontSize.md, fontWeight: FontWeight.semiBold, color: Colors.teak, textAlign: 'center', lineHeight: 24 },
});

export default ProgressScreen;
