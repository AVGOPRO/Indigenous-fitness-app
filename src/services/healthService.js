// Nalam — Health Calculation Service
// BMI, TDEE, Calorie Deficit, Weight Loss Pace, BMI Category

export const HealthService = {
  /**
   * Calculate BMI
   * @param {number} weightKg
   * @param {number} heightCm
   * @returns {number} BMI rounded to 1 decimal
   */
  calculateBMI(weightKg, heightCm) {
    if (!weightKg || !heightCm) return 0;
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  },

  /**
   * Get BMI category and color
   */
  getBMICategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: '#457B9D', zone: 'low' };
    if (bmi < 25)   return { label: 'Normal Weight', color: '#40916C', zone: 'normal' };
    if (bmi < 30)   return { label: 'Overweight', color: '#E8A020', zone: 'high' };
    if (bmi < 35)   return { label: 'Obese Class I', color: '#C8402A', zone: 'obese1' };
    if (bmi < 40)   return { label: 'Obese Class II', color: '#9A2E1C', zone: 'obese2' };
    return { label: 'Obese Class III', color: '#6B1C2E', zone: 'obese3' };
  },

  /**
   * Calculate TDEE using Mifflin-St Jeor Equation
   * Activity Levels: sedentary, light, moderate, active, veryActive
   */
  calculateTDEE(weightKg, heightCm, age, gender, activityLevel) {
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const multiplier = activityMultipliers[activityLevel] || 1.375;
    return Math.round(bmr * multiplier);
  },

  /**
   * Calculate daily calorie goal with 500 kcal deficit
   * Safe minimum: 1200 kcal for women, 1500 kcal for men
   */
  calculateCalorieGoal(tdee, gender) {
    const deficit = 500;
    const minimum = gender === 'male' ? 1500 : 1200;
    return Math.max(minimum, tdee - deficit);
  },

  /**
   * Calculate macro splits (40% carbs, 30% protein, 30% fat)
   */
  calculateMacros(calorieGoal) {
    return {
      carbs: Math.round((calorieGoal * 0.40) / 4),   // 4 kcal/g
      protein: Math.round((calorieGoal * 0.30) / 4), // 4 kcal/g
      fat: Math.round((calorieGoal * 0.30) / 9),     // 9 kcal/g
    };
  },

  /**
   * Estimate weeks using tiered pace:
   * Weeks 1-4: 0.5 kg/week (adaptation)
   * Weeks 5-12: 0.75 kg/week (building)
   * Weeks 13+: 1.0 kg/week (peak)
   */
  estimateWeeksToGoal(currentWeight, targetWeight) {
    const total = currentWeight - targetWeight;
    if (total <= 0) return 0;
    let remaining = total;
    let weeks = 0;
    // Phase 1: 4 weeks × 0.5 kg
    const p1 = Math.min(remaining, 4 * 0.5);
    weeks += Math.ceil(p1 / 0.5);
    remaining -= p1;
    if (remaining <= 0) return weeks;
    // Phase 2: 8 weeks × 0.75 kg
    const p2 = Math.min(remaining, 8 * 0.75);
    weeks += Math.ceil(p2 / 0.75);
    remaining -= p2;
    if (remaining <= 0) return weeks;
    // Phase 3: rest at 1.0 kg/week
    weeks += Math.ceil(remaining / 1.0);
    return weeks;
  },

  /**
   * Format weeks into human-readable label
   * e.g. 53 → { weeks: 53, months: 13, label: '~13 months' }
   */
  formatDuration(weeks) {
    if (!weeks || weeks <= 0) return { weeks: 0, months: 0, label: '—' };
    const months = Math.round(weeks / 4.33);
    if (months < 2) return { weeks, months, label: `~${weeks} weeks` };
    if (months < 24) return { weeks, months, label: `~${months} months` };
    const years = Math.floor(months / 12);
    const rem = months % 12;
    const label = rem > 0 ? `~${years} yr ${rem} mo` : `~${years} years`;
    return { weeks, months, label };
  },

  /**
   * Get ideal weight range using BMI 18.5–24.9
   */
  getIdealWeightRange(heightCm) {
    const heightM = heightCm / 100;
    return {
      min: parseFloat((18.5 * heightM * heightM).toFixed(1)),
      max: parseFloat((24.9 * heightM * heightM).toFixed(1)),
    };
  },

  /**
   * Calculate weight lost since start
   */
  weightLost(startWeight, currentWeight) {
    return parseFloat((startWeight - currentWeight).toFixed(1));
  },

  /**
   * Progress percentage toward goal
   */
  goalProgress(startWeight, currentWeight, targetWeight) {
    const totalToLose = startWeight - targetWeight;
    if (totalToLose <= 0) return 100;
    const lost = startWeight - currentWeight;
    return Math.min(100, Math.max(0, Math.round((lost / totalToLose) * 100)));
  },

  /**
   * Daily water goal (30ml per kg bodyweight)
   */
  waterGoalLiters(weightKg) {
    return parseFloat((weightKg * 0.030).toFixed(1));
  },

  /**
   * Water goal in glasses (250ml each)
   */
  waterGoalGlasses(weightKg) {
    return Math.ceil((weightKg * 0.030) / 0.250);
  },

  /**
   * Get motivational message based on weight lost
   */
  getMotivationMessage(weightLost) {
    if (weightLost <= 0) return 'Your journey begins today! 🌱';
    if (weightLost < 1)  return 'Incredible start! Keep going! 🔥';
    if (weightLost < 3)  return `${weightLost}kg gone! You\'re unstoppable! 💪`;
    if (weightLost < 5)  return `${weightLost}kg lighter! Feel the difference! ⚡`;
    if (weightLost < 10) return `${weightLost}kg down! You\'re transforming! 🌟`;
    return `${weightLost}kg lost! You\'re an inspiration! 🏆`;
  },
};

export default HealthService;
