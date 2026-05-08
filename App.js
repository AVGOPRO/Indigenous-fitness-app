// Nalam — Root Entry Point
// Sprint 2: Issue #1 (2.5s splash hold), Rangoli Option C (global particle overlay)

import React, { useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import StorageService from './src/services/storageService';
import NotificationService from './src/services/notificationService';
import useUserStore from './src/store/userStore';
import AppNavigator from './src/navigation/AppNavigator';
import Colors from './src/theme/colors';
import { RangoliParticleOverlay } from './src/components/common/RangoliParticle';

// Issue #1: Prevent the native splash from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const { loadProfile, profile, onboardingComplete, isLoading } = useUserStore();
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const [showInAppSplash, setShowInAppSplash] = React.useState(true);

  const initApp = useCallback(async () => {
    try {
      const startTime = Date.now();

      // 1. Initialize database
      await StorageService.initDatabase();

      // 2. Load user profile from DB
      await loadProfile();

      // 3. Request notification permission
      const granted = await NotificationService.requestPermission();

      // 4. Schedule reminders if we have a profile and permission
      if (granted) {
        const currentProfile = useUserStore.getState().profile;
        if (currentProfile?.onboardingComplete) {
          await NotificationService.scheduleAllReminders(currentProfile.name);
          await NotificationService.scheduleWeeklyReport();
        }
      }

      // Issue #1: Guarantee at least 2.5s splash display
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 2500 - elapsed);
      if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
      }

      // Hide native splash
      await SplashScreen.hideAsync().catch(() => {});

      // Fade out in-app splash
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setShowInAppSplash(false));

    } catch (error) {
      console.warn('[Nalam] App init error:', error);
      await SplashScreen.hideAsync().catch(() => {});
      setShowInAppSplash(false);
    }
  }, []);

  useEffect(() => {
    initApp();
  }, []);

  // Re-schedule notifications when onboarding completes
  useEffect(() => {
    if (onboardingComplete && profile?.name) {
      NotificationService.requestPermission().then(granted => {
        if (granted) {
          NotificationService.scheduleAllReminders(profile.name);
          NotificationService.scheduleWeeklyReport();
        }
      });
    }
  }, [onboardingComplete]);

  // Re-schedule notifications when user updates their name
  useEffect(() => {
    if (onboardingComplete && profile?.name) {
      NotificationService.requestPermission().then(granted => {
        if (granted) NotificationService.scheduleAllReminders(profile.name);
      });
    }
  }, [profile?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor={Colors.maroon} />
          <AppNavigator />
        </NavigationContainer>

        {/* Rangoli Option C: Global particle overlay — sits above everything */}
        <RangoliParticleOverlay />

        {/* Issue #1: In-app branded splash — fades out after 2.5s */}
        {showInAppSplash && (
          <Animated.View style={[styles.splash, { opacity: splashOpacity }]}>
            <Text style={styles.splashTamil}>நலம்</Text>
            <Text style={styles.splashTitle}>NALAM</Text>
            <Text style={styles.splashTagline}>— Your Wellness —</Text>
            <View style={styles.kolam}>
              {['✦', '❋', '✿', '✦', '❋'].map((s, i) => (
                <Text key={i} style={[styles.kolamChar, { opacity: 0.4 + i * 0.1 }]}>{s}</Text>
              ))}
            </View>
          </Animated.View>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // In-app splash (Issue #1): absolute overlay, fades out after 2.5s
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.maroon,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998, // below particle overlay (9999), above everything else
  },
  splashTamil: {
    fontSize: 56,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 4,
  },
  splashTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondary,
    letterSpacing: 10,
    marginTop: -6,
  },
  splashTagline: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.sandalwood + 'AA',
    letterSpacing: 4,
    marginTop: 12,
    fontStyle: 'italic',
  },
  kolam: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 16,
  },
  kolamChar: {
    fontSize: 20,
    color: Colors.secondary,
  },
});
