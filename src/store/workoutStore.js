// Nalam — Workout Store (Zustand)
import { create } from 'zustand';
import StorageService from '../services/storageService';
import { WorkoutPlans, WorkoutDayOrder } from '../data/workoutPlans';
import useUserStore from './userStore';

const getTodayDate = () => new Date().toISOString().split('T')[0];
const getTodayDayName = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
};

/** Returns how many full weeks have elapsed since onboardingDate */
const getCurrentWeekNumber = (onboardingDate) => {
  if (!onboardingDate) return 1;
  const start = new Date(onboardingDate);
  const now = new Date();
  const diffMs = now - start;
  const week = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.max(1, week);
};

/** Map week number → plan key */
const getPlanKeyForWeek = (week) => {
  if (week <= 4) return 'beginner';
  if (week <= 8) return 'intermediate';
  return 'advanced';
};

/** Phase metadata for display */
const PHASE_META = {
  beginner:     { label: 'Beginner',     emoji: '🌱', message: null },
  intermediate: { label: 'Intermediate', emoji: '💪', message: "You've levelled up! Exercises get harder — that means they're working! 🔥" },
  advanced:     { label: 'Advanced',     emoji: '🔥', message: "You're in the advanced phase! This is where real transformation happens! 🏆" },
};

const useWorkoutStore = create((set, get) => ({
  // State
  todayWorkout: null,
  todayDayName: getTodayDayName(),
  isCompleted: false,
  streak: 0,
  currentWeek: 1,
  currentPlanKey: 'beginner',
  currentExerciseIndex: 0,
  timerActive: false,
  isLoading: false,

  // Load today's workout data
  loadTodayWorkout: async () => {
    set({ isLoading: true });
    const dayName = getTodayDayName();

    // Derive week & plan from onboarding date
    const profile = useUserStore.getState().profile;
    const week = getCurrentWeekNumber(profile?.onboardingDate);
    const planKey = getPlanKeyForWeek(week);
    const plan = WorkoutPlans[planKey] || WorkoutPlans.beginner;
    const dayPlan = plan.days[dayName] || null;

    const log = await StorageService.getWorkoutLog(getTodayDate());
    const streak = await StorageService.getWorkoutStreak();

    set({
      todayWorkout: dayPlan,
      todayDayName: dayName,
      isCompleted: log?.completed === 1,
      streak,
      currentWeek: week,
      currentPlanKey: planKey,
      isLoading: false,
    });
  },

  // Get workout for a specific day (uses same plan as today)
  getWorkoutForDay: (dayName) => {
    const { currentPlanKey } = get();
    const plan = WorkoutPlans[currentPlanKey] || WorkoutPlans.beginner;
    return plan.days[dayName] || plan.weekend?.[dayName] || null;
  },

  // Mark workout as complete
  completeWorkout: async () => {
    const { todayWorkout, todayDayName, isTodayRestDay } = get();
    if (isTodayRestDay()) return;
    if (!todayWorkout) return;
    const date = getTodayDate();
    await StorageService.logWorkout(
      date,
      todayDayName,
      todayWorkout.focus,
      todayWorkout.calories || 150,
      todayWorkout.totalTime || 45
    );
    const streak = await StorageService.getWorkoutStreak();
    set({ isCompleted: true, streak });
  },

  // Get current plan phase metadata (label, emoji, level-up message)
  getPhaseMeta: () => {
    const { currentPlanKey } = get();
    return PHASE_META[currentPlanKey] || PHASE_META.beginner;
  },

  // Navigation through exercises
  setCurrentExercise: (index) => set({ currentExerciseIndex: index }),
  nextExercise: () => {
    const { currentExerciseIndex, todayWorkout } = get();
    const max = (todayWorkout?.exercises?.length || 1) - 1;
    set({ currentExerciseIndex: Math.min(currentExerciseIndex + 1, max) });
  },
  prevExercise: () => {
    const { currentExerciseIndex } = get();
    set({ currentExerciseIndex: Math.max(currentExerciseIndex - 1, 0) });
  },
  resetExerciseNav: () => set({ currentExerciseIndex: 0 }),

  // Timer control
  setTimerActive: (active) => set({ timerActive: active }),

  // Get weekly workout summary
  getWeeklyPlan: () => {
    const { currentPlanKey } = get();
    const plan = WorkoutPlans[currentPlanKey] || WorkoutPlans.beginner;
    return WorkoutDayOrder.map(day => ({
      day,
      workout: plan.days[day],
    }));
  },

  // Check if today is a rest day
  isTodayRestDay: () => {
    const dayName = getTodayDayName();
    return dayName === 'saturday' || dayName === 'sunday';
  },
}));

export default useWorkoutStore;
