// Nalam — Health Utilities (display helpers)
import HealthService from '../services/healthService';

export const HealthUtils = {
  bmiStatusColor: (bmi) => HealthService.getBMICategory(bmi).color,
  bmiStatusLabel: (bmi) => HealthService.getBMICategory(bmi).label,

  // Calorie bar color based on % consumed
  calorieBarColor: (consumed, goal) => {
    const pct = consumed / goal;
    if (pct < 0.7) return '#40916C';  // green — well under
    if (pct < 0.95) return '#E8A020'; // amber — approaching
    return '#C8402A';                  // red — at/over limit
  },

  // Pace message based on weekly weight change
  paceMessage: (weeklyChange) => {
    if (weeklyChange === 0) return 'Stay consistent — you will see movement soon.';
    if (weeklyChange < -0.7) return '⚡ Excellent pace! Keep it up.';
    if (weeklyChange < -0.3) return '✅ Great pace! Right on track.';
    if (weeklyChange < 0)    return '🌱 Steady progress. Keep going!';
    return '💪 Slight gain — check your diet and stay active.';
  },

  // Which meal slot should be active right now
  activeMealSlot: () => {
    const h = new Date().getHours();
    if (h < 9)  return 'breakfast';
    if (h < 12) return 'midMorning';
    if (h < 15) return 'lunch';
    if (h < 19) return 'snack';
    return 'dinner';
  },

  // Time of day label
  timeOfDay: () => {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    if (h < 21) return 'evening';
    return 'night';
  },
};

export default HealthUtils;
