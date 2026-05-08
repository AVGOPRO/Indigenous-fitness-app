// Nalam — Home Screen (Dashboard)
// Sprint 2: #2 shimmer name, #3 completed rings, #4 animated flame, #5 quote carousel, #6 water completion
import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, RefreshControl, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { FontSize, FontWeight } from '../theme/typography';
import useUserStore from '../store/userStore';
import useDietStore from '../store/dietStore';
import useWorkoutStore from '../store/workoutStore';
import RingProgress from '../components/common/RingProgress';
import { KolamDivider } from '../components/common/KalamCard';
import DateUtils from '../utils/dateUtils';
import ProfileEditModal from '../components/profile/ProfileEditModal';
import RangoliTouch from '../components/common/RangoliTouch';

// ─── Quote Data — Issue #5: Tamil + English pairs ─────────────────────────
const QUOTES = [
  {
    tamil: 'உடலே கோயில், உணவே தொழுகை.',
    english: 'Your body is a temple, food is prayer.',
    source: 'Tamil Wisdom',
  },
  {
    tamil: 'ஆரோக்கியமே மகாபாக்கியம்.',
    english: 'Health is the greatest wealth.',
    source: 'Tamil Proverb',
  },
  {
    tamil: 'நடை மருந்து, உணவு நோய் தீர்க்கும்.',
    english: 'Walking is medicine, food heals disease.',
    source: 'Siddha Wisdom',
  },
  {
    tamil: 'நோய்நாடி நோய்முதல் நாடி — அதற்கு வழிநாடல் வேண்டும்.',
    english: 'First find the root of illness, then seek the cure.',
    source: 'Thirukkural 948',
  },
  {
    tamil: 'மனம் ஒரு குரங்கு — அதை அடக்கினால் வாழ்வு இனிக்கும்.',
    english: 'The mind is a monkey — tame it and life becomes sweet.',
    source: 'Tamil Saying',
  },
  {
    tamil: 'சிறிய அடிகள் தினமும் — பெரிய மாற்றம் நாளை.',
    english: 'Small steps every day create great change tomorrow.',
    source: 'Nalam Wisdom',
  },
];

const HomeScreen = ({ navigation }) => {
  const profile = useUserStore(s => s.profile);
  const { loadTodayData, totalCalories, waterGlasses, waterGoal, isLoading } = useDietStore();
  const { streak, isCompleted, loadTodayWorkout } = useWorkoutStore();
  const [editModalVisible, setEditModalVisible] = useState(false);

  // ── Issue #5: Quote carousel state ──────────────────────────────────────
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quoteFade = useRef(new Animated.Value(1)).current;

  // ── Issue #2: Name shimmer animation ────────────────────────────────────
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  // ── Issue #4: Flame animation ────────────────────────────────────────────
  const flameScale = useRef(new Animated.Value(1)).current;
  const flameOpacity = useRef(new Animated.Value(1)).current;

  // ── Computed values ──────────────────────────────────────────────────────
  const calorieGoal = profile?.calorieGoal || 2000;
  const calorieProg = Math.min(1, totalCalories / calorieGoal);
  const caloriesLeft = Math.max(0, calorieGoal - totalCalories);
  const waterProg = waterGoal ? Math.min(1, waterGlasses / waterGoal) : 0;
  const weightLost = profile ? Math.max(0, profile.startWeight - profile.currentWeight) : 0;

  // Issue #3: completion flags for rings
  const caloriesDone = calorieGoal > 0 && totalCalories >= calorieGoal;
  const waterDone = waterGoal > 0 && waterGlasses >= waterGoal;

  useEffect(() => {
    loadTodayData();
    loadTodayWorkout();
  }, []);

  // Issue #5: 3s auto-advance quote carousel with fade
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(quoteFade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setQuoteIndex(i => (i + 1) % QUOTES.length);
        Animated.timing(quoteFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Issue #2: Shimmer loop on profile name
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: false, // color interpolation needs JS driver
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  // Issue #4: Flame pulse loop
  useEffect(() => {
    if (streak > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(flameScale, { toValue: 1.35, duration: 500, useNativeDriver: true }),
            Animated.timing(flameOpacity, { toValue: 0.7, duration: 500, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(flameScale, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(flameOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          ]),
        ])
      ).start();
    }
  }, [streak]);

  const nameColor = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.white, Colors.secondary], // white → gold shimmer
  });

  const currentQuote = QUOTES[quoteIndex];

  return (
    <>
    <ScrollView
      style={styles.screen}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => { loadTodayData(); loadTodayWorkout(); }} />}
    >
      {/* Header gradient */}
      <LinearGradient colors={Colors.gradientMaroon} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <View style={styles.headerNameRow}>
            <View>
              <Text style={styles.greeting}>{DateUtils.tamilGreeting()}</Text>
              {/* Issue #2: animated shimmer name */}
              <Animated.Text style={[styles.name, { color: nameColor }]}>
                {profile?.name || 'Friend'}
              </Animated.Text>
            </View>
            {/* Edit icon */}
            <RangoliTouch
              onPress={() => setEditModalVisible(true)}
              style={styles.editIconBtn}
              glowColor={Colors.glowGold}
            >
              <Ionicons name="create-outline" size={20} color={Colors.secondary} />
            </RangoliTouch>
          </View>

          {/* Issue #4: Animated flame badge */}
          {streak > 0 && (
            <View style={styles.streakBadge}>
              <Animated.Text style={[styles.streakFire, { transform: [{ scale: flameScale }], opacity: flameOpacity }]}>
                🔥
              </Animated.Text>
              <Text style={styles.streakNum}>{streak}</Text>
              <Text style={styles.streakLabel}>day streak</Text>
            </View>
          )}
        </View>
        <Text style={styles.dateText}>{DateUtils.todayDisplay()}</Text>

        {/* 3 rings — Issue #3 & #6: completed prop */}
        <View style={styles.ringRow}>
          <View style={styles.ringItem}>
            <RingProgress
              size={88} strokeWidth={8}
              progress={calorieProg}
              color={Colors.secondary}
              bgColor={Colors.sandalwood + '40'}
              label={`${Math.round(caloriesLeft)}`}
              sublabel="kcal left"
              completed={caloriesDone}
            />
            <Text style={styles.ringLabel}>Calories</Text>
          </View>
          <View style={styles.ringItem}>
            <RingProgress
              size={88} strokeWidth={8}
              progress={waterProg}
              color={Colors.secondary}
              bgColor={Colors.sandalwood + '40'}
              label={`${waterGlasses}/${waterGoal}`}
              sublabel="glasses"
              completed={waterDone}
            />
            <Text style={styles.ringLabel}>Water</Text>
          </View>
          <View style={styles.ringItem}>
            <RingProgress
              size={88} strokeWidth={8}
              progress={isCompleted ? 1 : 0}
              color={Colors.secondary}
              bgColor={Colors.sandalwood + '40'}
              label={isCompleted ? '✓' : '0%'}
              sublabel="workout"
              completed={isCompleted}
            />
            <Text style={styles.ringLabel}>Exercise</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Issue #5: Quote carousel with Tamil + English */}
        <Animated.View style={[styles.quoteCard, { opacity: quoteFade }]}>
          <Text style={styles.quoteIcon}>🪔</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.quoteTamil}>{currentQuote.tamil}</Text>
            <Text style={styles.quoteEnglish}>{currentQuote.english}</Text>
            <Text style={styles.quoteSource}>— {currentQuote.source}</Text>
          </View>
        </Animated.View>

        {/* Carousel dots */}
        <View style={styles.quoteDots}>
          {QUOTES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === quoteIndex && styles.dotActive]}
            />
          ))}
        </View>

        <KolamDivider />

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: Colors.accent + '15' }]}>
            <Text style={styles.statValue}>{weightLost > 0 ? `${weightLost.toFixed(1)} kg` : '0.0 kg'}</Text>
            <Text style={styles.statLabel}>{weightLost > 0 ? '🎉 Lost so far' : '🌱 Journey starts today'}</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors.primary + '15' }]}>
            <Text style={styles.statValue}>
              {profile ? Math.max(0, (profile.startWeight - profile.targetWeight - weightLost)).toFixed(1) : '0.0'} kg
            </Text>
            <Text style={styles.statLabel}>🎯 Remaining</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[
            { label: 'Log Meal', icon: 'restaurant', color: Colors.primary, screen: 'Diet' },
            { label: 'Workout', icon: 'fitness', color: Colors.secondary, screen: 'Workout' },
            { label: 'Meditate', icon: 'flower', color: Colors.accent, screen: 'Meditation' },
            { label: 'Progress', icon: 'trending-up', color: Colors.maroon, screen: 'Progress' },
          ].map((action) => (
            <RangoliTouch
              key={action.label}
              style={[styles.actionTile, { borderColor: action.color + '40' }]}
              onPress={() => navigation.navigate(action.screen)}
              glowColor={Colors.glowGold}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                <Ionicons name={action.icon} size={26} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </RangoliTouch>
          ))}
        </View>

        {/* Today's calorie snapshot */}
        <Text style={styles.sectionTitle}>Today's Calories</Text>
        <View style={styles.calorieCard}>
          <View style={styles.calorieRow}>
            <View style={styles.calItem}>
              <Text style={styles.calVal}>{profile?.calorieGoal || 0}</Text>
              <Text style={styles.calLabel}>Goal</Text>
            </View>
            <Text style={styles.calMinus}>−</Text>
            <View style={styles.calItem}>
              <Text style={[styles.calVal, { color: Colors.secondary }]}>{Math.round(totalCalories)}</Text>
              <Text style={styles.calLabel}>Eaten</Text>
            </View>
            <Text style={styles.calEquals}>=</Text>
            <View style={styles.calItem}>
              <Text style={[styles.calVal, { color: caloriesLeft > 0 ? Colors.accent : Colors.error }]}>{Math.round(caloriesLeft)}</Text>
              <Text style={styles.calLabel}>Remaining</Text>
            </View>
          </View>
          <View style={styles.calorieBarBg}>
            <View style={[styles.calorieBarFill, { width: `${Math.min(100, calorieProg * 100)}%`, backgroundColor: caloriesDone ? Colors.secondary : Colors.primary }]} />
          </View>
        </View>

        {/* Workout banner */}
        <Text style={styles.sectionTitle}>Today's Workout</Text>
        <RangoliTouch
          onPress={() => navigation.navigate('Workout')}
          style={{ borderRadius: Radius.xl }}
          glowColor={Colors.glowGold}
        >
          <LinearGradient
            colors={isCompleted ? [Colors.secondary, Colors.accent] : Colors.gradientPrimary}
            style={styles.workoutBanner}
          >
            <Text style={styles.workoutIcon}>{isCompleted ? '✅' : '💪'}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.workoutBannerTitle}>
                {isCompleted ? 'Workout Complete! Great job!' : "Start Today's Workout"}
              </Text>
              <Text style={styles.workoutBannerSub}>
                {isCompleted ? "You're on a roll!" : 'Tap to begin your session →'}
              </Text>
            </View>
          </LinearGradient>
        </RangoliTouch>
      </View>
    </ScrollView>

    {/* Profile Edit Modal */}
    <ProfileEditModal
      visible={editModalVisible}
      onClose={() => setEditModalVisible(false)}
    />
    </>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  headerGrad: { paddingTop: 56, paddingHorizontal: Spacing.base, paddingBottom: Spacing.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  greeting: { fontSize: FontSize.sm, color: Colors.sandalwood, fontWeight: FontWeight.medium },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.extraBold, marginTop: 2 },
  dateText: { fontSize: FontSize.xs, color: Colors.sandalwood + 'CC', marginBottom: Spacing.lg },
  streakBadge: { backgroundColor: Colors.primaryDark, borderRadius: Radius.lg, padding: Spacing.sm, alignItems: 'center', minWidth: 56 },
  streakFire: { fontSize: 20 },
  streakNum: { fontSize: FontSize.lg, fontWeight: FontWeight.extraBold, color: Colors.white },
  streakLabel: { fontSize: FontSize.xs, color: Colors.white + 'CC' },
  headerNameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  editIconBtn: { width: 32, height: 32, borderRadius: Radius.full, backgroundColor: Colors.secondary + '25', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  ringRow: { flexDirection: 'row', justifyContent: 'space-around' },
  ringItem: { alignItems: 'center', gap: 6 },
  ringLabel: { fontSize: FontSize.xs, color: Colors.sandalwood, fontWeight: FontWeight.semiBold },
  content: { padding: Spacing.base },
  // Quote carousel
  quoteCard: { flexDirection: 'row', backgroundColor: Colors.primary + '15', borderRadius: Radius.lg, padding: Spacing.md, gap: Spacing.sm, alignItems: 'flex-start', marginBottom: Spacing.xs },
  quoteIcon: { fontSize: 22, marginTop: 2 },
  quoteTamil: { fontSize: FontSize.sm, color: Colors.teak, fontWeight: FontWeight.semiBold, lineHeight: 20, marginBottom: 2 },
  quoteEnglish: { fontSize: FontSize.xs, color: Colors.textSecondary, fontStyle: 'italic', lineHeight: 18 },
  quoteSource: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 3 },
  quoteDots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: Spacing.sm },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.sandalwood },
  dotActive: { backgroundColor: Colors.secondary, width: 18 },
  statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  statCard: { flex: 1, borderRadius: Radius.lg, padding: Spacing.md, alignItems: 'center' },
  statValue: { fontSize: FontSize.xl, fontWeight: FontWeight.extraBold, color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 2 },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.md, marginTop: Spacing.sm },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginBottom: Spacing.base },
  actionTile: { width: '47.5%', backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.base, alignItems: 'center', gap: Spacing.sm, borderWidth: 1.5, ...Shadow.sm },
  actionIcon: { width: 52, height: 52, borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.textPrimary },
  calorieCard: { backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.base, ...Shadow.sm, marginBottom: Spacing.base },
  calorieRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: Spacing.md },
  calItem: { alignItems: 'center' },
  calVal: { fontSize: FontSize.xl, fontWeight: FontWeight.extraBold, color: Colors.textPrimary },
  calLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  calMinus: { fontSize: FontSize.xl, color: Colors.textMuted },
  calEquals: { fontSize: FontSize.xl, color: Colors.textMuted },
  calorieBarBg: { height: 8, backgroundColor: Colors.sandalwood, borderRadius: Radius.full, overflow: 'hidden' },
  calorieBarFill: { height: '100%', borderRadius: Radius.full },
  workoutBanner: { borderRadius: Radius.xl, padding: Spacing.base, flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.xl },
  workoutIcon: { fontSize: 36 },
  workoutBannerTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  workoutBannerSub: { fontSize: FontSize.sm, color: Colors.white + 'CC', marginTop: 2 },
});

export default HomeScreen;
