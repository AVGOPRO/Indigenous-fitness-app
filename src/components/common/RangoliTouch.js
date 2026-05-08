// Nalam — RangoliTouch: Rangoli illumination effect on every press
// Wraps any child — emits a golden glow burst on tap.
// Part of Option C: also calls global spawnRangoliBurst for screen-space particles.
import React, { useRef, useCallback } from 'react';
import {
  TouchableOpacity, Animated, StyleSheet,
} from 'react-native';
import Colors from '../../theme/colors';
import { spawnRangoliBurst } from './RangoliParticle';

const RangoliTouch = ({
  children,
  onPress,
  style,
  glowColor = Colors.glowGold,
  disabled = false,
  activeOpacity = 0.85,
}) => {
  const glowAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const triggerGlow = useCallback((e) => {
    // Amplified inner glow
    glowAnim.setValue(0);
    scaleAnim.setValue(1);
    Animated.parallel([
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.96,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Option C: spawn global screen-space particles at touch position
    if (e?.nativeEvent) {
      spawnRangoliBurst(e.nativeEvent.pageX, e.nativeEvent.pageY);
    }

    if (onPress) onPress();
  }, [onPress]);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.75],   // much more visible
  });
  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 2.2],  // expands well beyond component
  });

  return (
    <TouchableOpacity
      onPress={triggerGlow}
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[styles.wrapper, style]}
    >
      <Animated.View style={[styles.body, { transform: [{ scale: scaleAnim }] }]}>
        {children}
        {/* Rangoli glow overlay — not clipped, sits above children */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              backgroundColor: glowColor,
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // overflow:hidden removed — was clipping the glow burst
    borderRadius: 16,
  },
  body: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: -30,
    left: -30,
    right: -30,
    bottom: -30,
    borderRadius: 999,
  },
});

export default RangoliTouch;
