// Nalam — Diet Store (Zustand)
import { create } from 'zustand';
import StorageService from '../services/storageService';
import { FoodDatabase } from '../data/foodDatabase';

const getTodayDate = () => new Date().toISOString().split('T')[0];

const useDietStore = create((set, get) => ({
  // State
  todayLogs: [],
  waterGlasses: 0,
  waterGoal: 8,
  totalCalories: 0,
  isLoading: false,
  selectedDate: getTodayDate(),

  // Load today's diet data
  loadTodayData: async (date) => {
    const d = date || getTodayDate();
    set({ isLoading: true, selectedDate: d });
    const [logs, waterLog] = await Promise.all([
      StorageService.getDietLog(d),
      StorageService.getWaterLog(d),
    ]);
    const total = logs.reduce((sum, l) => sum + (l.calories * l.quantity), 0);
    set({
      todayLogs: logs,
      totalCalories: Math.round(total),
      waterGlasses: waterLog?.glasses_count || 0,
      waterGoal: waterLog?.goal_glasses || 8,
      isLoading: false,
    });
  },

  // Log a food item
  logFood: async (mealType, foodItem) => {
    const { selectedDate } = get();
    await StorageService.logFood(selectedDate, mealType, foodItem);
    await get().loadTodayData(selectedDate);
  },

  // Delete a food log entry
  deleteFoodLog: async (logId) => {
    await StorageService.deleteFoodLog(logId);
    const { selectedDate } = get();
    await get().loadTodayData(selectedDate);
  },

  // Update water intake
  addWaterGlass: async () => {
    const { waterGlasses, waterGoal, selectedDate } = get();
    const newCount = Math.min(waterGlasses + 1, 20);
    set({ waterGlasses: newCount });
    await StorageService.updateWaterLog(selectedDate, newCount, waterGoal);
  },

  removeWaterGlass: async () => {
    const { waterGlasses, waterGoal, selectedDate } = get();
    const newCount = Math.max(waterGlasses - 1, 0);
    set({ waterGlasses: newCount });
    await StorageService.updateWaterLog(selectedDate, newCount, waterGoal);
  },

  // Set water goal
  setWaterGoal: async (goal) => {
    const { waterGlasses, selectedDate } = get();
    set({ waterGoal: goal });
    await StorageService.updateWaterLog(selectedDate, waterGlasses, goal);
  },

  // Computed
  getCaloriesLeft: (calorieGoal) => {
    const { totalCalories } = get();
    return Math.max(0, calorieGoal - totalCalories);
  },

  getCalorieProgress: (calorieGoal) => {
    const { totalCalories } = get();
    if (!calorieGoal) return 0;
    return Math.min(1, totalCalories / calorieGoal);
  },

  getWaterProgress: () => {
    const { waterGlasses, waterGoal } = get();
    if (!waterGoal) return 0;
    return Math.min(1, waterGlasses / waterGoal);
  },

  // Get logs grouped by meal type
  getLogsByMealType: () => {
    const { todayLogs } = get();
    return todayLogs.reduce((grouped, log) => {
      if (!grouped[log.meal_type]) grouped[log.meal_type] = [];
      grouped[log.meal_type].push(log);
      return grouped;
    }, {});
  },

  // Search food database
  searchFood: (query) => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    return FoodDatabase.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    ).slice(0, 20);
  },
}));

export default useDietStore;
