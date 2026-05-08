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
   * Estimate weeks to reach target weight
   * ~0.5 kg/week with 500 kcal deficit
   */
  estimateWeeksToGoal(currentWeight, targetWeight) {
    const weightToLose = currentWeight - targetWeight;
    if (weightToLose <= 0) return 0;
    return Math.ceil(weightToLose / 0.5);
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
