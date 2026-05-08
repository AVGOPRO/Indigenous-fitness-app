// Nalam — Meditation Screen (Sprint 2: #11 audio, #12 pause/resume)
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Animated, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { FontSize, FontWeight } from '../theme/typography';
import { MeditationSessions, MeditationCategories } from '../data/meditationSessions';
import StorageService from '../services/storageService';
import AudioService from '../services/audioService';
import DateUtils from '../utils/dateUtils';

const BreathGuide = ({ pattern, isActive }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    if (!isActive) { scale.setValue(1); opacity.setValue(0.5); return; }
    const cycle = () => Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, { toValue: 1.6, duration: pattern.inhale * 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: pattern.inhale * 1000, useNativeDriver: true }),
      ]),
      Animated.delay((pattern.hold || 0) * 1000),
      Animated.parallel([
        Animated.timing(scale, { toValue: 1, duration: pattern.exhale * 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: pattern.exhale * 1000, useNativeDriver: true }),
      ]),
      Animated.delay((pattern.holdEmpty || 0) * 1000),
    ]);
    Animated.loop(cycle()).start();
    return () => { scale.stopAnimation(); opacity.stopAnimation(); };
  }, [isActive]);
  return (
    <View style={styles.breathContainer}>
      <Animated.View style={[styles.breathOuter, { transform: [{ scale }], opacity }]}>
        <Animated.View style={styles.breathInner}>
          <Text style={styles.breathEmoji}>🌸</Text>
        </Animated.View>
      </Animated.View>
      {isActive && (
        <View style={styles.breathLabels}>
          <Text style={styles.breathLabel}>Inhale {pattern.inhale}s</Text>
          {pattern.hold > 0 && <Text style={styles.breathLabel}>Hold {pattern.hold}s</Text>}
          <Text style={styles.breathLabel}>Exhale {pattern.exhale}s</Text>
        </View>
      )}
    </View>
  );
};

const MeditationScreen = () => {
  const [filter, setFilter] = useState('All');
  const [activeSession, setActiveSession] = useState(null);
  const [sessionRunning, setSessionRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef(null);
  const hasLogged = useRef(false); // BUG-003 guard

  const filtered = MeditationSessions.filter(s => filter === 'All' || s.category === filter);

  const startSession = async (session) => {
    hasLogged.current = false;
    setActiveSession(session);
    setElapsedSeconds(0);
    setIsPaused(false);
    setSessionRunning(true);
    await AudioService.play(session.id); // Issue #11
  };

  const pauseSession = async () => {
    clearInterval(intervalRef.current);
    setSessionRunning(false);
    setIsPaused(true);
    await AudioService.pause(); // Issue #12
  };

  const resumeSession = async () => {
    setIsPaused(false);
    setSessionRunning(true);
    await AudioService.resume(); // Issue #12
  };

  const stopSession = async () => {
    clearInterval(intervalRef.current);
    setSessionRunning(false);
    setIsPaused(false);
    await AudioService.stop();
    const mins = Math.round(elapsedSeconds / 60);
    if (mins >= 1 && !hasLogged.current && activeSession) {
      hasLogged.current = true;
      await StorageService.logMeditation(DateUtils.today(), activeSession.id, activeSession.name, mins);
    }
    setActiveSession(null);
  };

  const confirmStop = () => Alert.alert(
    'End Session?',
    'Progress saved if ≥1 min completed.',
    [{ text: 'Keep Going' }, { text: 'End', style: 'destructive', onPress: stopSession }]
  );

  useEffect(() => {
    if (sessionRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          if (activeSession && prev >= activeSession.duration * 60) {
            clearInterval(intervalRef.current);
            setSessionRunning(false);
            if (!hasLogged.current) {
              hasLogged.current = true;
              StorageService.logMeditation(DateUtils.today(), activeSession.id, activeSession.name, activeSession.duration);
              AudioService.stop();
            }
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [sessionRunning]);

  useEffect(() => () => { AudioService.stop(); }, []);

  const mm = Math.floor(elapsedSeconds / 60);
  const ss = elapsedSeconds % 60;
  const progress = activeSession ? Math.min(1, elapsedSeconds / (activeSession.duration * 60)) : 0;

  if (activeSession) {
    return (
      <LinearGradient colors={[activeSession.bgColor, activeSession.accentColor + '80']} style={styles.activeScreen}>
        <View style={styles.activeHeader}>
          <TouchableOpacity onPress={confirmStop} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.activeTitle}>{activeSession.name}</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.activeSub}>{activeSession.subtitle}</Text>
        <BreathGuide pattern={activeSession.breathPattern} isActive={sessionRunning} />
        <Text style={styles.activeTimer}>
          {String(mm).padStart(2,'0')}:{String(ss).padStart(2,'0')} / {String(activeSession.duration).padStart(2,'0')}:00
        </Text>
        {isPaused && (
          <View style={styles.pausedBadge}>
            <Text style={styles.pausedText}>⏸ Paused</Text>
          </View>
        )}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: activeSession.accentColor }]} />
        </View>
        <ScrollView style={styles.instructionScroll} showsVerticalScrollIndicator={false}>
          {activeSession.instructions.map((step, i) => (
            <View key={i} style={styles.instructionStep}>
              <View style={[styles.stepDot, { backgroundColor: activeSession.accentColor }]}>
                <Text style={styles.stepNum}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Issue #12: Pause / Resume / End controls */}
        <View style={styles.sessionControls}>
          {sessionRunning ? (
            <TouchableOpacity onPress={pauseSession} style={[styles.ctrlBtn, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
              <Ionicons name="pause" size={20} color={Colors.white} />
              <Text style={styles.ctrlText}>Pause</Text>
            </TouchableOpacity>
          ) : isPaused ? (
            <TouchableOpacity onPress={resumeSession} style={[styles.ctrlBtn, { backgroundColor: activeSession.accentColor }]}>
              <Ionicons name="play" size={20} color={Colors.white} />
              <Text style={styles.ctrlText}>Resume</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={confirmStop} style={[styles.ctrlBtn, { backgroundColor: 'rgba(200,0,0,0.4)', flex: 1 }]}>
            <Ionicons name="stop" size={20} color={Colors.white} />
            <Text style={styles.ctrlText}>End Session</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <LinearGradient colors={[Colors.maroon, Colors.secondary + 'AA']} style={styles.header}>
        <Text style={styles.headerTitle}>🧘 Meditation</Text>
        <Text style={styles.headerSub}>Pranayama & Mindfulness</Text>
        <Text style={styles.headerQuote}>"मन एव मनुष्याणाम् — The mind is everything." — Upanishads</Text>
      </LinearGradient>
      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterRow}>
            {MeditationCategories.map(cat => (
              <TouchableOpacity key={cat} onPress={() => setFilter(cat)}
                style={[styles.filterChip, filter === cat && styles.filterChipActive]}>
                <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {filtered.map(session => (
          <TouchableOpacity key={session.id} onPress={() => startSession(session)}>
            <LinearGradient colors={[session.bgColor, session.bgColor + 'CC']} style={styles.sessionCard}>
              <View style={styles.sessionTop}>
                <Text style={styles.sessionEmoji}>{session.emoji}</Text>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionName}>{session.name}</Text>
                  <Text style={styles.sessionSub}>{session.subtitle}</Text>
                  <View style={styles.sessionMeta}>
                    <Text style={styles.sessionDur}>⏱ {session.duration} min</Text>
                    <Text style={styles.sessionLvl}>· {session.level}</Text>
                    {session.audioFile && <Text style={styles.sessionAudio}>· 🎵</Text>}
                  </View>
                </View>
                <Ionicons name="play-circle" size={40} color={session.accentColor} />
              </View>
              <View style={styles.benefitRow}>
                {session.benefits.map((b, i) => (
                  <View key={i} style={[styles.benefitChip, { borderColor: session.accentColor + '60' }]}>
                    <Text style={[styles.benefitText, { color: session.accentColor }]}>{b}</Text>
                  </View>
                ))}
              </View>
              {session.caution && <Text style={styles.caution}>⚠️ {session.caution}</Text>}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: Spacing.base, paddingBottom: Spacing.xl },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white, marginBottom: 4 },
  headerSub: { fontSize: FontSize.sm, color: Colors.sandalwood },
  headerQuote: { fontSize: FontSize.xs, color: Colors.sandalwood + 'BB', fontStyle: 'italic', marginTop: Spacing.sm, lineHeight: 18 },
  content: { padding: Spacing.base },
  filterRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  filterChip: { paddingHorizontal: Spacing.md, paddingVertical: 6, borderRadius: Radius.full, backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.sandalwood },
  filterChipActive: { backgroundColor: Colors.maroon, borderColor: Colors.maroon },
  filterText: { fontSize: FontSize.sm, color: Colors.textMuted, fontWeight: FontWeight.medium },
  filterTextActive: { color: Colors.white },
  sessionCard: { borderRadius: Radius.xl, padding: Spacing.base, marginBottom: Spacing.md, ...Shadow.md },
  sessionTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.sm },
  sessionEmoji: { fontSize: 40, width: 48 },
  sessionInfo: { flex: 1 },
  sessionName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.white },
  sessionSub: { fontSize: FontSize.sm, color: Colors.white + 'CC', marginTop: 2 },
  sessionMeta: { flexDirection: 'row', marginTop: 4, gap: 4 },
  sessionDur: { fontSize: FontSize.xs, color: Colors.white + 'BB' },
  sessionLvl: { fontSize: FontSize.xs, color: Colors.white + 'BB' },
  sessionAudio: { fontSize: FontSize.xs, color: Colors.secondary },
  benefitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  benefitChip: { borderWidth: 1, borderRadius: Radius.full, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
  benefitText: { fontSize: FontSize.xs, fontWeight: FontWeight.medium },
  caution: { fontSize: FontSize.xs, color: Colors.warning, marginTop: Spacing.sm },
  activeScreen: { flex: 1, padding: Spacing.base, paddingTop: 56 },
  activeHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  activeTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white, textAlign: 'center' },
  activeSub: { fontSize: FontSize.sm, color: Colors.white + 'AA', textAlign: 'center', marginBottom: Spacing.lg },
  breathContainer: { alignItems: 'center', marginVertical: Spacing.xl },
  breathOuter: { width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  breathInner: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  breathEmoji: { fontSize: 48 },
  breathLabels: { flexDirection: 'row', gap: Spacing.md, marginTop: Spacing.md },
  breathLabel: { fontSize: FontSize.xs, color: Colors.white + 'CC', fontWeight: FontWeight.medium },
  activeTimer: { fontSize: FontSize.xxl, fontWeight: FontWeight.extraBold, color: Colors.white, textAlign: 'center', letterSpacing: 2, marginBottom: Spacing.sm },
  pausedBadge: { alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.full, paddingHorizontal: Spacing.base, paddingVertical: 4, marginBottom: Spacing.sm },
  pausedText: { fontSize: FontSize.sm, color: Colors.white, fontWeight: FontWeight.semiBold },
  progressBg: { height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.full, marginHorizontal: Spacing.xl, marginBottom: Spacing.base, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: Radius.full },
  instructionScroll: { flex: 1, marginBottom: Spacing.base },
  instructionStep: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.sm, alignItems: 'flex-start' },
  stepDot: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stepNum: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.white },
  stepText: { flex: 1, fontSize: FontSize.sm, color: Colors.white + 'EE', lineHeight: 20 },
  sessionControls: { flexDirection: 'row', gap: Spacing.sm, paddingBottom: Spacing.xl },
  ctrlBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: Radius.full, paddingVertical: Spacing.md },
  ctrlText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
});

export default MeditationScreen;
