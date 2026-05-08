// Nalam — Local Notification Service
// All 8 notification types, fully offline

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const CHANNEL_ID = 'nalam-reminders';

export const NotificationService = {
  // ─── PERMISSION & SETUP ──────────────────────────────────
  async requestPermission() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
        name: 'Nalam Reminders',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#E8A020',
        sound: 'default',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  },

  async cancelAllNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  // ─── SCHEDULE ALL 8 REMINDERS ────────────────────────────
  async scheduleAllReminders(userName = 'Friend') {
    await this.cancelAllNotifications();

    const name = userName.split(' ')[0];

    const reminders = [
      // 1. Morning Wake-Up — 6:00 AM
      {
        content: {
          title: `🌅 Vanakkam, ${name}!`,
          body: 'A new day, a lighter you. Start with gratitude and water.',
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 6, minute: 0, repeats: true },
      },
      // 2. Breakfast — 7:30 AM
      {
        content: {
          title: '🍲 Breakfast Time!',
          body: 'Nourish your body — a healthy breakfast sets the tone for the day.',
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 7, minute: 30, repeats: true },
      },
      // 3. Workout — 8:00 AM
      {
        content: {
          title: '💪 Time to Move!',
          body: "Your body is ready. 30 minutes of movement changes everything.",
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 8, minute: 0, repeats: true },
      },
      // 4. Hydration — 10:00 AM
      {
        content: {
          title: '💧 Drink Water!',
          body: 'Your body is 70% water. Keep it flowing. 1 glass now.',
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 10, minute: 0, repeats: true },
      },
      // 5. Lunch — 1:00 PM
      {
        content: {
          title: '🍛 Lunch is Ready!',
          body: 'Eat mindfully. Chew slowly. Your stomach thanks you.',
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 13, minute: 0, repeats: true },
      },
      // 6. Midday Hydration — 3:00 PM
      {
        content: {
          title: '💧 Hydration Check',
          body: 'How many glasses today? Keep sipping — stay energized.',
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 15, minute: 0, repeats: true },
      },
      // 7. Meditation — 6:00 PM
      {
        content: {
          title: '🧘 Meditate Now',
          body: '5 minutes of calm changes your evening. Open Nalam.',
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 18, minute: 0, repeats: true },
      },
      // 8. Dinner — 8:00 PM
      {
        content: {
          title: '🌙 Light Dinner Time',
          body: 'Keep it light, keep it wholesome. Sleep better, lose faster.',
          channelId: CHANNEL_ID,
        },
        trigger: { hour: 20, minute: 0, repeats: true },
      },
    ];

    const ids = [];
    for (const reminder of reminders) {
      const id = await Notifications.scheduleNotificationAsync(reminder);
      ids.push(id);
    }

    return ids;
  },

  // ─── WEEKLY REPORT — SUNDAYS 9 AM ────────────────────────
  async scheduleWeeklyReport() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📊 Your Weekly Report is Ready!',
        body: 'See your progress, celebrate your wins, and plan next week.',
        channelId: CHANNEL_ID,
      },
      trigger: {
        weekday: 1, // Sunday (1 = Sunday in Expo)
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });
  },

  // ─── WORKOUT COMPLETE CELEBRATION ────────────────────────
  async sendWorkoutCelebration(name = 'Friend') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🏆 Workout Complete!',
        body: `Fantastic work, ${name.split(' ')[0]}! Every session counts. You are becoming unstoppable.`,
        channelId: CHANNEL_ID,
      },
      trigger: null, // immediate
    });
  },

  // ─── WATER GOAL CELEBRATION ──────────────────────────────
  async sendWaterGoalCelebration() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💧 Water Goal Achieved! 🎉',
        body: 'You hit your daily water goal! Your body loves you for it.',
        channelId: CHANNEL_ID,
      },
      trigger: null,
    });
  },

  // ─── STREAK MILESTONE ────────────────────────────────────
  async sendStreakNotification(streakDays) {
    const milestones = { 3: '🔥', 7: '⚡', 14: '🌟', 21: '🏅', 30: '🏆' };
    const emoji = milestones[streakDays] || '💪';
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${emoji} ${streakDays}-Day Streak!`,
        body: `${streakDays} days in a row! You're building a lifestyle, not just a routine.`,
        channelId: CHANNEL_ID,
      },
      trigger: null,
    });
  },
};

export default NotificationService;
