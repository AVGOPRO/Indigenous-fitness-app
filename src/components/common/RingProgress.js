// Nalam — Ring Progress (Circular progress indicator)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Colors from '../../theme/colors';
import { FontSize, FontWeight } from '../../theme/typography';

const RingProgress = ({
  size = 100,
  strokeWidth = 10,
  progress = 0,         // 0 to 1
  color = Colors.primary,
  bgColor = Colors.sandalwood,
  label,
  sublabel,
  centerContent,
  completed = false,    // when true: show ✓ and override ring to gold
}) => {
  const ringColor = completed ? Colors.secondary : color;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(1, Math.max(0, completed ? 1 : progress));
  const strokeDashoffset = circumference * (1 - clampedProgress);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFillObject}>
        {/* Background ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center content */}
      <View style={styles.center}>
        {completed ? (
          <>
            <Text style={[styles.checkmark, { color: Colors.secondary }]}>✓</Text>
            <Text style={styles.sublabel}>Done!</Text>
          </>
        ) : centerContent || (
          <>
            {label && (
              <Text style={[styles.label, { color }]} numberOfLines={1} adjustsFontSizeToFit>
                {label}
              </Text>
            )}
            {sublabel && (
              <Text style={styles.sublabel} numberOfLines={1}>
                {sublabel}
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
  },
  checkmark: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extraBold,
    textAlign: 'center',
  },
  sublabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default RingProgress;
