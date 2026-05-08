// Nalam — User Profile Store (Zustand)
import { create } from 'zustand';
import StorageService from '../services/storageService';
import HealthService from '../services/healthService';

const useUserStore = create((set, get) => ({
  // State
  profile: null,
  isLoading: true,
  onboardingComplete: false,

  // Load profile from SQLite
  loadProfile: async () => {
    set({ isLoading: true });
    const profile = await StorageService.getProfile();
    if (profile) {
      set({
        profile: {
          name: profile.name,
          age: profile.age,
          gender: profile.gender,
          heightCm: profile.height_cm,
          startWeight: profile.start_weight,
          currentWeight: profile.current_weight,
          targetWeight: profile.target_weight,
          activityLevel: profile.activity_level,
          calorieGoal: profile.calorie_goal,
          waterGoalGlasses: profile.water_goal_glasses,
          onboardingComplete: profile.onboarding_complete === 1,
        },
        onboardingComplete: profile.onboarding_complete === 1,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }
  },

  // Save new or updated profile
  saveProfile: async (profileData) => {
    const { calorieGoal, waterGoalGlasses } = profileData;
    const finalData = {
      ...profileData,
      calorieGoal: calorieGoal || HealthService.calculateCalorieGoal(
        HealthService.calculateTDEE(
          profileData.startWeight,
          profileData.heightCm,
          profileData.age,
          profileData.gender,
          profileData.activityLevel
        ),
        profileData.gender
      ),
      waterGoalGlasses: waterGoalGlasses || HealthService.waterGoalGlasses(profileData.startWeight),
      onboardingComplete: true,
    };
    await StorageService.saveProfile(finalData);
    set({ profile: finalData, onboardingComplete: true });
  },

  // Update current weight
  updateCurrentWeight: async (weightKg) => {
    const { profile } = get();
    if (!profile) return;
    const updated = { ...profile, currentWeight: weightKg };
    await StorageService.saveProfile(updated);
    set({ profile: updated });
  },

  // Computed
  getBMI: () => {
    const { profile } = get();
    if (!profile) return 0;
    return HealthService.calculateBMI(profile.currentWeight, profile.heightCm);
  },

  getWeightLost: () => {
    const { profile } = get();
    if (!profile) return 0;
    return HealthService.weightLost(profile.startWeight, profile.currentWeight);
  },

  getGoalProgress: () => {
    const { profile } = get();
    if (!profile) return 0;
    return HealthService.goalProgress(profile.startWeight, profile.currentWeight, profile.targetWeight);
  },

  getMacros: () => {
    const { profile } = get();
    if (!profile) return { carbs: 0, protein: 0, fat: 0 };
    return HealthService.calculateMacros(profile.calorieGoal);
  },
}));

export default useUserStore;
