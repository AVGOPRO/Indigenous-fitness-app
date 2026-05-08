// Nalam — RangoliParticle: Global screen-space burst system (Rangoli Option C)
// Renders Rangoli-inspired gold particle bursts at any touch point in the app.
// This overlay sits above everything with pointerEvents="none" so it never blocks touches.
//
// Usage:
//   1. Mount <RangoliParticleOverlay /> once at the root (App.js)
//   2. Call spawnRangoliBurst(x, y) from any touch handler (RangoliTouch calls it automatically)

import React, { useRef, useCallback } from 'react';
import { StyleSheet, Animated, Dimensions, View } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// ─── Singleton accessor ────────────────────────────────────────────────────
// The overlay registers itself here so any code can call spawnRangoliBurst(x, y).
let _spawnFn = null;

export const spawnRangoliBurst = (x, y) => {
  if (_spawnFn) _spawnFn(x, y);
};

// ─── Single Particle ──────────────────────────────────────────────────────
const GOLD_COLORS = ['#D4A843', '#F5C842', '#C49A30', '#FFD700', '#E8B84B', '#B8860B'];
const SHAPES = ['●', '◆', '✦', '✧', '❋', '✿'];

const Particle = React.memo(({ id, x, y, onDone }) => {
  const angle = useRef(Math.random() * 2 * Math.PI).current;
  const distance = useRef(40 + Math.random() * 80).current;
  const color = useRef(GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)]).current;
  const shape = useRef(SHAPES[Math.floor(Math.random() * SHAPES.length)]).current;
  const size = useRef(8 + Math.random() * 10).current;
  const duration = useRef(500 + Math.random() * 300).current;

  const opacity = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: Math.cos(angle) * distance,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: Math.sin(angle) * distance,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.2,
        duration,
        useNativeDriver: true,
      }),
    ]).start(() => onDone(id));
  }, []);

  return (
    <Animated.Text
      style={[
        styles.particle,
        {
          fontSize: size,
          color,
          left: x,
          top: y,
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    >
      {shape}
    </Animated.Text>
  );
});

// ─── Overlay Component ────────────────────────────────────────────────────
let _nextId = 0;

export const RangoliParticleOverlay = () => {
  const [particles, setParticles] = React.useState([]);

  const spawn = useCallback((x, y) => {
    const count = 8 + Math.floor(Math.random() * 5); // 8–12 particles per burst
    const newParticles = Array.from({ length: count }, () => ({
      id: _nextId++,
      x: x - 8, // center on touch
      y: y - 8,
    }));
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Register spawn fn when mounted, unregister on unmount
  React.useEffect(() => {
    _spawnFn = spawn;
    return () => { _spawnFn = null; };
  }, [spawn]);

  const handleDone = useCallback((id) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <View style={styles.overlay} pointerEvents="none">
      {particles.map(p => (
        <Particle key={p.id} id={p.id} x={p.x} y={p.y} onDone={handleDone} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  particle: {
    position: 'absolute',
    fontWeight: 'bold',
  },
});

export default RangoliParticleOverlay;
