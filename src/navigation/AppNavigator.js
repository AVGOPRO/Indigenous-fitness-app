// Nalam — Root App Navigator
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import TabNavigator from './TabNavigator';
import useUserStore from '../store/userStore';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const onboardingComplete = useUserStore(s => s.onboardingComplete);
  const isLoading = useUserStore(s => s.isLoading);

  if (isLoading) return null; // SplashScreen shown by Expo

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {!onboardingComplete ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <Stack.Screen name="Main" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
