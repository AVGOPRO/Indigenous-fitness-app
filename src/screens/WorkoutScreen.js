// Nalam — Workout Screen
// Sprint 2: Issue #10 — tappable weekly day cards (read-only modal)
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert, Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { FontSize, FontWeight } from '../theme/typography';
import useWorkoutStore from '../store/workoutStore';
import WorkoutTimer from '../components/workout/WorkoutTimer';
import NotificationService from '../services/notificationService';
import useUserStore from '../store/userStore';
import { WorkoutDayOrder } from '../data/workoutPlans';
import { Formatters } from '../utils/formatters';

const WorkoutScreen = () => {
  const {
    todayWorkout, isCompleted, streak, loadTodayWorkout,
    completeWorkout, isTodayRestDay, todayDayName, getWeeklyPlan,
    currentWeek, getPhaseMeta,
  } = useWorkoutStore();
  const profile = useUserStore(s => s.profile);

  const [activeTab, setActiveTab] = useState('today');
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerLabel, setTimerLabel] = useState('Rest Timer');
  // Issue #10: weekly day detail modal
  const [selectedDay, setSelectedDay] = useState(null); // { day, workout }

  useEffect(() => { loadTodayWorkout(); }, []);

  const handleComplete = async () => {
    Alert.alert(
      '🏆 Workout Complete?',
      'Mark today\'s workout as done?',
      [
        { text: 'Not yet' },
        {
          text: 'Yes, I\'m done! 💪',
          onPress: async () => {
            await completeWorkout();
            await NotificationService.sendWorkoutCelebration(profile?.name || 'Friend');
          },
        },
      ]
    );
  };

  const startTimer = (seconds, label) => {
    setTimerSeconds(seconds);
    setTimerLabel(label);
    setShowTimer(true);
  };

  const weeklyPlan = getWeeklyPlan();
  const isRestDay = isTodayRestDay();
  const phase = getPhaseMeta();

  const dayDisplayNames = {
    monday: 'MON', tuesday: 'TUE', wednesday: 'WED',
    thursday: 'THU', friday: 'FRI',
  };

  return (
    <>
    <ScrollView style={styles.screen}>
      {/* Header */}
      <LinearGradient colors={Colors.gradientMaroon} style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>💪 Workout</Text>
          <View style={styles.weekBadge}>
            <Text style={styles.weekBadgeText}>{phase.emoji} Week {currentWeek} · {phase.label}</Text>
          </View>
        </View>
        <View style={styles.headerMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaVal}>{streak}</Text>
            <Text style={styles.metaLabel}>Day Streak 🔥</Text>
          </View>
          {todayWorkout && (
            <>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaVal}>{todayWorkout.totalTime || 45}m</Text>
                <Text style={styles.metaLabel}>Duration</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Text style={styles.metaVal}>~{todayWorkout.calories || 150}</Text>
                <Text style={styles.metaLabel}>kcal burn</Text>
              </View>
            </>
          )}
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Level-up banner */}
        {phase.message && (
          <View style={styles.levelUpBanner}>
            <Text style={styles.levelUpText}>{phase.message}</Text>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabs}>
          {['today', 'week'].map(tab => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.tabActive]}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'today' ? "Today's Plan" : 'Weekly View'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TODAY TAB */}
        {activeTab === 'today' && (
          <>
            {isRestDay ? (
              <View style={styles.restCard}>
                <Text style={styles.restEmoji}>😌</Text>
                <Text style={styles.restTitle}>Active Rest Day</Text>
                <Text style={styles.restSub}>Today is {Formatters.capitalize(todayDayName)}. Rest, stretch, or go for a light 30-min walk.</Text>
              </View>
            ) : !todayWorkout ? (
              <View style={styles.restCard}>
                <Text style={styles.restEmoji}>📅</Text>
                <Text style={styles.restTitle}>No workout today</Text>
                <Text style={styles.restSub}>Enjoy your rest day. Recovery is part of progress.</Text>
              </View>
            ) : (
              <>
                {/* Focus badge */}
                <View style={styles.focusBadge}>
                  <Text style={styles.focusIcon}>{todayWorkout.icon}</Text>
                  <Text style={styles.focusText}>{todayWorkout.focus}</Text>
                  {isCompleted && (
                    <View style={styles.completedChip}>
                      <Text style={styles.completedChipText}>✓ Done</Text>
                    </View>
                  )}
                </View>

                {/* Timer (if shown) */}
                {showTimer && (
                  <WorkoutTimer
                    key={`${timerSeconds}-${timerLabel}`}
                    initialSeconds={timerSeconds}
                    label={timerLabel}
                    accentColor={Colors.secondary}
                    onComplete={() => setShowTimer(false)}
                  />
                )}

                {/* Warmup */}
                <Text style={styles.sectionLabel}>🌡️ Warm-up</Text>
                {todayWorkout.warmup?.map((w, i) => (
                  <View key={i} style={styles.warmupItem}>
                    <Text style={styles.warmupName}>{w.name}</Text>
                    <Text style={styles.warmupDetail}>{w.duration}s · {w.sets} sets</Text>
                  </View>
                ))}

                {/* Exercises */}
                <Text style={styles.sectionLabel}>🏋️ Exercises</Text>
                {todayWorkout.exercises?.map((ex, i) => (
                  <View key={ex.id} style={styles.exCard}>
                    <View style={styles.exHeader}>
                      <Text style={styles.exNum}>{i + 1}</Text>
                      <View style={styles.exInfo}>
                        <Text style={styles.exName}>{ex.emoji} {ex.name}</Text>
                        <Text style={styles.exMeta}>
                          {ex.reps
                            ? `${ex.sets} × ${ex.reps} reps`
                            : ex.duration >= 60
                              ? `${ex.sets} × ${Math.round(ex.duration / 60)}min`
                              : `${ex.sets} × ${ex.duration}s`}
                          {' · '}Rest: {ex.rest > 0 ? `${ex.rest}s` : 'None'}
                        </Text>
                        <Text style={styles.exInstruction}>{ex.instruction}</Text>
                      </View>
                    </View>
                    <View style={styles.exActions}>
                      <TouchableOpacity
                        style={styles.timerBtn}
                        onPress={() => startTimer(ex.rest, `Rest — ${ex.name}`)}
                      >
                        <Ionicons name="timer-outline" size={14} color={Colors.primary} />
                        <Text style={styles.timerBtnText}>Start rest {ex.rest}s</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Cooldown */}
                <View style={styles.cooldownCard}>
                  <Text style={styles.cooldownTitle}>❄️ Cool Down</Text>
                  <Text style={styles.cooldownText}>{todayWorkout.cooldown}</Text>
                </View>

                {/* Complete button */}
                {!isCompleted && (
                  <TouchableOpacity onPress={handleComplete}>
                    <LinearGradient colors={Colors.gradientAccent} style={styles.completeBtn}>
                      <Ionicons name="checkmark-circle" size={24} color={Colors.white} />
                      <Text style={styles.completeBtnText}>Mark Workout Complete</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}

                {isCompleted && (
                  <View style={styles.completedBanner}>
                    <Text style={styles.completedBannerText}>🏆 Workout Complete! You're amazing!</Text>
                  </View>
                )}
              </>
            )}
          </>
        )}

        {/* WEEKLY VIEW — Issue #10: tappable cards */}
        {activeTab === 'week' && (
          <View>
            {weeklyPlan.map(({ day, workout }) => (
              <TouchableOpacity
                key={day}
                onPress={() => workout && setSelectedDay({ day, workout })}
                activeOpacity={workout ? 0.75 : 1}
                style={[styles.weekCard, day === todayDayName && styles.weekCardToday]}
              >
                <View style={[styles.dayChip, day === todayDayName && styles.dayChipToday]}>
                  <Text style={[styles.dayChipText, day === todayDayName && styles.dayChipTextToday]}>
                    {dayDisplayNames[day]}
                  </Text>
                </View>
                <View style={styles.weekInfo}>
                  <Text style={styles.weekFocus}>{workout?.icon} {workout?.focus}</Text>
                  <Text style={styles.weekMeta}>{workout?.exercises?.length} exercises · ~{workout?.totalTime}min</Text>
                </View>
                <View style={styles.weekCardRight}>
                  {day === todayDayName && isCompleted && (
                    <Ionicons name="checkmark-circle" size={22} color={Colors.accent} />
                  )}
                  {workout && <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />}
                </View>
              </TouchableOpacity>
            ))}
            <View style={[styles.weekCard, { backgroundColor: Colors.sandalwood + '30' }]}>
              <View style={styles.dayChip}><Text style={styles.dayChipText}>SAT</Text></View>
              <View style={styles.weekInfo}>
                <Text style={styles.weekFocus}>🌿 Active Rest — Light walk or swim</Text>
                <Text style={styles.weekMeta}>30 min · ~150 kcal</Text>
              </View>
            </View>
            <View style={[styles.weekCard, { backgroundColor: Colors.sandalwood + '30' }]}>
              <View style={styles.dayChip}><Text style={styles.dayChipText}>SUN</Text></View>
              <View style={styles.weekInfo}>
                <Text style={styles.weekFocus}>😌 Rest & Recovery — Stretch only</Text>
                <Text style={styles.weekMeta}>Full rest · ~50 kcal</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>

    {/* Issue #10: Day detail modal (read-only) */}
    <Modal
      visible={!!selectedDay}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setSelectedDay(null)}
    >
      {selectedDay && (
        <View style={styles.dayModal}>
          <View style={styles.dayModalHeader}>
            <Text style={styles.dayModalTitle}>
              {dayDisplayNames[selectedDay.day]} · {selectedDay.workout.icon} {selectedDay.workout.focus}
            </Text>
            <TouchableOpacity onPress={() => setSelectedDay(null)}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <View style={styles.dayModalMeta}>
            <Text style={styles.dayModalMetaText}>⏱ ~{selectedDay.workout.totalTime} min</Text>
            <Text style={styles.dayModalMetaText}>🔥 ~{selectedDay.workout.calories} kcal</Text>
            <Text style={styles.dayModalMetaText}>🏋️ {selectedDay.workout.exercises?.length} exercises</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.dayModalSection}>🌡️ Warm-up</Text>
            {selectedDay.workout.warmup?.map((w, i) => (
              <View key={i} style={styles.dayModalItem}>
                <Text style={styles.dayModalItemName}>{w.name}</Text>
                <Text style={styles.dayModalItemMeta}>{w.duration}s · {w.sets} sets</Text>
              </View>
            ))}
            <Text style={styles.dayModalSection}>🏋️ Exercises</Text>
            {selectedDay.workout.exercises?.map((ex, i) => (
              <View key={ex.id || i} style={styles.dayModalExCard}>
                <Text style={styles.dayModalExNum}>{i + 1}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dayModalExName}>{ex.emoji} {ex.name}</Text>
                  <Text style={styles.dayModalExMeta}>
                    {ex.reps
                      ? `${ex.sets} × ${ex.reps} reps`
                      : ex.duration >= 60
                        ? `${ex.sets} × ${Math.round(ex.duration / 60)}min`
                        : `${ex.sets} × ${ex.duration}s`}
                    {' · '}Rest: {ex.rest > 0 ? `${ex.rest}s` : 'None'}
                  </Text>
                  <Text style={styles.dayModalExInstr}>{ex.instruction}</Text>
                </View>
              </View>
            ))}
            <View style={styles.dayModalCooldown}>
              <Text style={styles.dayModalSection}>❄️ Cool Down</Text>
              <Text style={styles.dayModalItemName}>{selectedDay.workout.cooldown}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: Spacing.base, paddingBottom: Spacing.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  weekBadge: { backgroundColor: Colors.white + '25', borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 4 },
  weekBadgeText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.white },
  levelUpBanner: { backgroundColor: Colors.accent + '20', borderLeftWidth: 4, borderLeftColor: Colors.accent, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md },
  levelUpText: { fontSize: FontSize.sm, color: Colors.accent, fontWeight: FontWeight.semiBold, lineHeight: 20 },
  headerMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  metaItem: { alignItems: 'center' },
  metaVal: { fontSize: FontSize.xl, fontWeight: FontWeight.extraBold, color: Colors.white },
  metaLabel: { fontSize: FontSize.xs, color: Colors.sandalwood },
  metaDivider: { width: 1, height: 32, backgroundColor: Colors.white + '30' },
  content: { padding: Spacing.base },
  tabs: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: 4, marginBottom: Spacing.base, ...Shadow.sm },
  tab: { flex: 1, paddingVertical: Spacing.sm, borderRadius: Radius.lg, alignItems: 'center' },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.textMuted },
  tabTextActive: { color: Colors.white },
  restCard: { alignItems: 'center', padding: Spacing.xl, backgroundColor: Colors.surface, borderRadius: Radius.xl, ...Shadow.sm },
  restEmoji: { fontSize: 56, marginBottom: Spacing.md },
  restTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.sm },
  restSub: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', lineHeight: 22 },
  focusBadge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.primary + '15', borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.md },
  focusIcon: { fontSize: 28 },
  focusText: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.teak },
  completedChip: { backgroundColor: Colors.accent, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  completedChipText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.white },
  sectionLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: Spacing.sm, marginTop: Spacing.sm },
  warmupItem: { flexDirection: 'row', justifyContent: 'space-between', padding: Spacing.sm, backgroundColor: Colors.surface, borderRadius: Radius.md, marginBottom: 4 },
  warmupName: { fontSize: FontSize.sm, color: Colors.textPrimary },
  warmupDetail: { fontSize: FontSize.sm, color: Colors.textMuted },
  exCard: { backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.base, marginBottom: Spacing.sm, ...Shadow.sm },
  exHeader: { flexDirection: 'row', gap: Spacing.sm },
  exNum: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primary, color: Colors.white, textAlign: 'center', lineHeight: 28, fontWeight: FontWeight.bold, fontSize: FontSize.sm },
  exInfo: { flex: 1 },
  exName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  exMeta: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  exInstruction: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 4, fontStyle: 'italic', lineHeight: 18 },
  exActions: { marginTop: Spacing.sm, flexDirection: 'row' },
  timerBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary + '15', borderRadius: Radius.full, paddingHorizontal: Spacing.md, paddingVertical: 4 },
  timerBtnText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: FontWeight.semiBold },
  cooldownCard: { backgroundColor: Colors.accentLight + '20', borderRadius: Radius.lg, padding: Spacing.md, marginTop: Spacing.sm, marginBottom: Spacing.md },
  cooldownTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.accent, marginBottom: 4 },
  cooldownText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  completeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm, borderRadius: Radius.full, padding: Spacing.base, marginTop: Spacing.sm, marginBottom: Spacing.xl },
  completeBtnText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  completedBanner: { backgroundColor: Colors.accent, borderRadius: Radius.xl, padding: Spacing.base, alignItems: 'center', marginBottom: Spacing.xl },
  completedBannerText: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  weekCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  weekCardToday: { borderWidth: 2, borderColor: Colors.primary },
  weekCardRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dayChip: { width: 44, height: 44, borderRadius: Radius.lg, backgroundColor: Colors.sandalwood, alignItems: 'center', justifyContent: 'center' },
  dayChipToday: { backgroundColor: Colors.primary },
  dayChipText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.teak },
  dayChipTextToday: { color: Colors.white },
  weekInfo: { flex: 1 },
  weekFocus: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.textPrimary },
  weekMeta: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  // Day detail modal
  dayModal: { flex: 1, backgroundColor: Colors.background, padding: Spacing.base },
  dayModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.md, marginBottom: Spacing.sm },
  dayModalTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, flex: 1 },
  dayModalMeta: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.base, flexWrap: 'wrap' },
  dayModalMetaText: { fontSize: FontSize.sm, color: Colors.textMuted },
  dayModalSection: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginTop: Spacing.md, marginBottom: Spacing.sm },
  dayModalItem: { flexDirection: 'row', justifyContent: 'space-between', padding: Spacing.sm, backgroundColor: Colors.surface, borderRadius: Radius.md, marginBottom: 4 },
  dayModalItemName: { fontSize: FontSize.sm, color: Colors.textPrimary },
  dayModalItemMeta: { fontSize: FontSize.sm, color: Colors.textMuted },
  dayModalExCard: { flexDirection: 'row', gap: Spacing.sm, backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm },
  dayModalExNum: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.primary, color: Colors.white, textAlign: 'center', lineHeight: 24, fontWeight: FontWeight.bold, fontSize: FontSize.xs },
  dayModalExName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  dayModalExMeta: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  dayModalExInstr: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 4, fontStyle: 'italic' },
  dayModalCooldown: { backgroundColor: Colors.accentLight + '20', borderRadius: Radius.lg, padding: Spacing.md, marginTop: Spacing.sm, marginBottom: Spacing.xl },
});

export default WorkoutScreen;
