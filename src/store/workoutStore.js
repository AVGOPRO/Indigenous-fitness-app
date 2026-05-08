// Nalam — Workout Store (Zustand)
import { create } from 'zustand';
import StorageService from '../services/storageService';
import { WorkoutPlans, WorkoutDayOrder } from '../data/workoutPlans';

const getTodayDate = () => new Date().toISOString().split('T')[0];
const getTodayDayName = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
};

const useWorkoutStore = create((set, get) => ({
  // State
  todayWorkout: null,
  todayDayName: getTodayDayName(),
  isCompleted: false,
  streak: 0,
  currentExerciseIndex: 0,
  timerActive: false,
  isLoading: false,

  // Load today's workout data
  loadTodayWorkout: async () => {
    set({ isLoading: true });
    const dayName = getTodayDayName();
    const plan = WorkoutPlans.beginner;
    const dayPlan = plan.days[dayName] || null;

    const log = await StorageService.getWorkoutLog(getTodayDate());
    const streak = await StorageService.getWorkoutStreak();

    set({
      todayWorkout: dayPlan,
      todayDayName: dayName,
      isCompleted: log?.completed === 1,
      streak,
      isLoading: false,
    });
  },

  // Get workout for a specific day
  getWorkoutForDay: (dayName) => {
    const plan = WorkoutPlans.beginner;
    return plan.days[dayName] || plan.weekend?.[dayName] || null;
  },

  // Mark workout as complete
  completeWorkout: async () => {
    const { todayWorkout, todayDayName, isTodayRestDay } = get();
    // BUG-002 fix: block completion on rest days to prevent streak corruption
    if (isTodayRestDay()) return;
    if (!todayWorkout) return;
    const date = getTodayDate();
    await StorageService.logWorkout(
      date,
      todayDayName,
      todayWorkout.focus,
      todayWorkout.calories || 150,
      todayWorkout.totalTime || 30
    );
    const streak = await StorageService.getWorkoutStreak();
    set({ isCompleted: true, streak });
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

  // Get weekly workout summary (which days done this week)
  getWeeklyPlan: () => {
    return WorkoutDayOrder.map(day => ({
      day,
      workout: WorkoutPlans.beginner.days[day],
    }));
  },

  // Check if today is a rest day
  isTodayRestDay: () => {
    const dayName = getTodayDayName();
    return dayName === 'saturday' || dayName === 'sunday';
  },
}));

export default useWorkoutStore;
