// Nalam — Workout Timer Component
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../theme/colors';
import { Spacing, Radius, Shadow } from '../../theme/spacing';
import { FontSize, FontWeight } from '../../theme/typography';
import { Formatters } from '../../utils/formatters';

const WorkoutTimer = ({ initialSeconds = 60, label = 'Rest Timer', onComplete, accentColor, autoStart = true }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false); // will be set true in mount effect
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Issue #9 fix: auto-start the countdown when the timer mounts
  useEffect(() => {
    if (autoStart) {
      setIsRunning(true);
    }
  }, []);

  // Pulse animation when running
  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.05, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isRunning]);

  // Countdown
  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsComplete(true);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    if (isComplete) {
      setSeconds(initialSeconds);
      setIsComplete(false);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsComplete(false);
    setSeconds(initialSeconds);
  };

  const progress = 1 - (seconds / initialSeconds);
  const accent = accentColor || Colors.primary;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Animated.View style={[styles.timerCircle, { transform: [{ scale: pulseAnim }], borderColor: accent }]}>
        <Text style={[styles.timeText, { color: accent }]}>
          {Formatters.minutes(seconds)}
        </Text>
        <Text style={styles.secLabel}>
          {isComplete ? '✓ Done!' : isRunning ? 'Running...' : 'Paused'}
        </Text>
      </Animated.View>

      {/* Progress bar */}
      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: accent }]} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
          <Ionicons name="refresh" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleStartStop}
          style={[styles.mainBtn, { backgroundColor: isRunning ? Colors.secondary : accent }]}
        >
          <Ionicons
            name={isComplete ? 'refresh' : isRunning ? 'pause' : 'play'}
            size={28}
            color={Colors.white}
          />
        </TouchableOpacity>

        <View style={{ width: 44 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    ...Shadow.md,
    marginVertical: Spacing.sm,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  timerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    marginBottom: Spacing.md,
  },
  timeText: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extraBold,
    letterSpacing: 2,
  },
  secLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  progressBg: {
    width: '80%',
    height: 4,
    backgroundColor: Colors.sandalwood,
    borderRadius: Radius.full,
    overflow: 'hidden',
    marginBottom: Spacing.base,
  },
  progressFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxl,
  },
  resetBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.sandalwood,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBtn: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
});

export default WorkoutTimer;
