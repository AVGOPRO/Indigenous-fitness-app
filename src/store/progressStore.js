// Nalam — Progress Store (Zustand)
import { create } from 'zustand';
import StorageService from '../services/storageService';
import HealthService from '../services/healthService';

const useProgressStore = create((set, get) => ({
  // State
  weightLogs: [],
  latestWeight: null,
  isLoading: false,

  // Load all weight logs
  loadWeightLogs: async () => {
    set({ isLoading: true });
    const logs = await StorageService.getWeightLogs(90);
    const latest = logs[0]?.weight_kg || null;
    set({ weightLogs: logs.reverse(), latestWeight: latest, isLoading: false });
  },

  // Log new weight
  logWeight: async (weightKg, notes = '') => {
    const date = new Date().toISOString().split('T')[0];
    await StorageService.logWeight(date, weightKg, notes);
    set({ latestWeight: weightKg });
    await get().loadWeightLogs();
  },

  // Get chart data for weight over time
  getChartData: (days = 30) => {
    const { weightLogs } = get();
    const recent = weightLogs.slice(-days);
    return {
      labels: recent.map(l => {
        const d = new Date(l.date);
        return `${d.getDate()}/${d.getMonth() + 1}`;
      }),
      data: recent.map(l => l.weight_kg),
    };
  },

  // Get weekly reports data
  getWeeklyReport: async () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const start = startOfWeek.toISOString().split('T')[0];
    const end = today.toISOString().split('T')[0];
    return await StorageService.getWeeklyStats(start, end);
  },

  // Get monthly report data
  getMonthlyReport: async () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const end = today.toISOString().split('T')[0];
    return await StorageService.getWeeklyStats(start, end);
  },

  // Get quarterly report data
  getQuarterlyReport: async () => {
    const today = new Date();
    const quarterStart = new Date(today);
    quarterStart.setDate(today.getDate() - 90);
    const start = quarterStart.toISOString().split('T')[0];
    const end = today.toISOString().split('T')[0];
    return await StorageService.getWeeklyStats(start, end);
  },

  // Computed: weight change over period
  getWeightChange: (days = 7) => {
    const { weightLogs } = get();
    if (weightLogs.length < 2) return 0;
    const recent = weightLogs.slice(-days);
    if (recent.length < 2) return 0;
    const change = recent[recent.length - 1].weight_kg - recent[0].weight_kg;
    return parseFloat(change.toFixed(1));
  },

  // Get BMI trend
  getBMITrend: (heightCm) => {
    const { weightLogs } = get();
    return weightLogs.slice(-30).map(log => ({
      date: log.date,
      bmi: HealthService.calculateBMI(log.weight_kg, heightCm),
    }));
  },
}));

export default useProgressStore;
