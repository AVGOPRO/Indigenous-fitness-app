// Nalam — Bottom Tab Navigator
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';
import { FontSize, FontWeight } from '../theme/typography';
import { Spacing, Radius } from '../theme/spacing';
import HomeScreen from '../screens/HomeScreen';
import DietScreen from '../screens/DietScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import MeditationScreen from '../screens/MeditationScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ReportsScreen from '../screens/ReportsScreen';

const Tab = createBottomTabNavigator();

const TABS = [
  { name: 'Home', component: HomeScreen, icon: 'home', label: 'Home' },
  { name: 'Diet', component: DietScreen, icon: 'restaurant', label: 'Diet' },
  { name: 'Workout', component: WorkoutScreen, icon: 'fitness', label: 'Workout' },
  { name: 'Meditation', component: MeditationScreen, icon: 'flower', label: 'Meditate' },
  { name: 'Progress', component: ProgressScreen, icon: 'trending-up', label: 'Progress' },
  { name: 'Reports', component: ReportsScreen, icon: 'bar-chart', label: 'Reports' },
];

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          const tab = TABS.find(t => t.name === route.name);
          const iconName = focused ? tab.icon : `${tab.icon}-outline`;
          return (
            <View style={focused ? styles.activeIconBg : null}>
              <Ionicons name={iconName} size={focused ? 22 : 20} color={color} />
            </View>
          );
        },
        tabBarLabel: ({ focused, color }) => {
          const tab = TABS.find(t => t.name === route.name);
          return (
            <Text style={[styles.tabLabel, { color }]}>
              {tab.label}
            </Text>
          );
        },
      })}
    >
      {TABS.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBackground,
    borderTopWidth: 0,
    height: 64,
    paddingBottom: 10,
    paddingTop: 6,
    elevation: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    letterSpacing: 0.3,
  },
  activeIconBg: {
    backgroundColor: Colors.primary + '18',
    borderRadius: Radius.lg,
    padding: 6,
    marginBottom: -6,
  },
});

export default TabNavigator;
