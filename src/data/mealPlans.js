// Nalam — Meal Plans (4-week rotating)
// Designed for 1400–1600 kcal/day deficit diet
// South Indian base + North Indian + Continental variety
// Eggs daily, Chicken 2–3x per week

export const MealPlans = {
  week1: {
    monday: {
      breakfast: [
        { foodId: 'si_001', quantity: 3, note: '3 Idlis' },
        { foodId: 'si_005', quantity: 1, note: '1 cup Sambar' },
        { foodId: 'bv_002', quantity: 1, note: 'Green Tea' },
      ],
      midMorning: [
        { foodId: 'eg_001', quantity: 1, note: '1 Boiled Egg' },
        { foodId: 'co_003', quantity: 1, note: '1 Banana' },
      ],
      lunch: [
        { foodId: 'si_019', quantity: 1, note: '1 cup Brown Rice' },
        { foodId: 'si_008', quantity: 1, note: 'Vegetable Kootu' },
        { foodId: 'si_007', quantity: 1, note: 'Rasam' },
        { foodId: 'sn_004', quantity: 1, note: 'Buttermilk' },
      ],
      snack: [
        { foodId: 'sn_001', quantity: 1, note: 'Roasted Chana' },
        { foodId: 'bv_003', quantity: 1, note: 'Turmeric Milk' },
      ],
      dinner: [
        { foodId: 'ni_002', quantity: 2, note: '2 Whole Wheat Rotis' },
        { foodId: 'ni_009', quantity: 1, note: 'Lauki Sabzi' },
        { foodId: 'si_007', quantity: 1, note: 'Rasam' },
      ],
    },
    tuesday: {
      breakfast: [
        { foodId: 'si_003', quantity: 2, note: '2 Oats Dosas' },
        { foodId: 'si_006', quantity: 1, note: 'Coconut Chutney' },
        { foodId: 'bv_001', quantity: 1, note: 'Black Coffee' },
      ],
      midMorning: [
        { foodId: 'eg_003', quantity: 1, note: 'Scrambled Eggs (2)' },
      ],
      lunch: [
        { foodId: 'ch_001', quantity: 1, note: 'Grilled Chicken 100g' },
        { foodId: 'co_005', quantity: 1, note: 'Mixed Salad' },
        { foodId: 'ni_002', quantity: 1, note: '1 Roti' },
        { foodId: 'sn_004', quantity: 1, note: 'Buttermilk' },
      ],
      snack: [
        { foodId: 'sn_002', quantity: 1, note: 'Makhana' },
        { foodId: 'sn_005', quantity: 1, note: 'Coconut Water' },
      ],
      dinner: [
        { foodId: 'si_009', quantity: 1, note: 'Moong Dal Soup' },
        { foodId: 'ni_002', quantity: 2, note: '2 Rotis' },
        { foodId: 'co_008', quantity: 1, note: 'Grilled Vegetables' },
      ],
    },
    wednesday: {
      breakfast: [
        { foodId: 'co_001', quantity: 1, note: 'Oatmeal bowl' },
        { foodId: 'eg_007', quantity: 1, note: '1 Poached Egg' },
        { foodId: 'bv_002', quantity: 1, note: 'Green Tea' },
      ],
      midMorning: [
        { foodId: 'sn_003', quantity: 1, note: 'Fruit Bowl' },
      ],
      lunch: [
        { foodId: 'si_019', quantity: 1, note: 'Brown Rice' },
        { foodId: 'si_005', quantity: 1, note: 'Sambar' },
        { foodId: 'si_015', quantity: 1, note: 'Aviyal' },
        { foodId: 'si_016', quantity: 2, note: '2 Roasted Papadums' },
      ],
      snack: [
        { foodId: 'sn_006', quantity: 1, note: 'Sprouts Salad' },
        { foodId: 'bv_004', quantity: 1, note: 'Jeera Water' },
      ],
      dinner: [
        { foodId: 'ch_003', quantity: 1, note: 'Chicken Soup' },
        { foodId: 'ni_002', quantity: 2, note: '2 Rotis' },
        { foodId: 'co_005', quantity: 1, note: 'Green Salad' },
      ],
    },
    thursday: {
      breakfast: [
        { foodId: 'si_004', quantity: 2, note: '2 Ragi Dosas' },
        { foodId: 'si_005', quantity: 1, note: 'Sambar' },
        { foodId: 'bv_003', quantity: 1, note: 'Turmeric Milk' },
      ],
      midMorning: [
        { foodId: 'eg_001', quantity: 2, note: '2 Boiled Eggs' },
        { foodId: 'co_004', quantity: 1, note: '1 Apple' },
      ],
      lunch: [
        { foodId: 'ni_007', quantity: 1, note: 'Khichdi' },
        { foodId: 'co_002', quantity: 1, note: 'Greek Yogurt' },
        { foodId: 'si_007', quantity: 1, note: 'Rasam' },
      ],
      snack: [
        { foodId: 'sn_001', quantity: 1, note: 'Roasted Chana' },
      ],
      dinner: [
        { foodId: 'si_009', quantity: 1, note: 'Moong Dal Soup' },
        { foodId: 'ni_002', quantity: 2, note: '2 Rotis' },
        { foodId: 'ni_006', quantity: 1, note: 'Mixed Vegetable Curry' },
      ],
    },
    friday: {
      breakfast: [
        { foodId: 'si_010', quantity: 1, note: 'Ven Pongal' },
        { foodId: 'si_005', quantity: 1, note: 'Sambar' },
        { foodId: 'bv_002', quantity: 1, note: 'Green Tea' },
      ],
      midMorning: [
        { foodId: 'eg_004', quantity: 1, note: 'Veg Omelette' },
      ],
      lunch: [
        { foodId: 'ch_002', quantity: 1, note: 'Light Chicken Curry' },
        { foodId: 'si_019', quantity: 1, note: 'Brown Rice' },
        { foodId: 'co_005', quantity: 1, note: 'Salad' },
        { foodId: 'sn_004', quantity: 1, note: 'Buttermilk' },
      ],
      snack: [
        { foodId: 'sn_002', quantity: 1, note: 'Makhana' },
        { foodId: 'sn_005', quantity: 1, note: 'Coconut Water' },
      ],
      dinner: [
        { foodId: 'co_010', quantity: 1, note: 'Lentil Soup' },
        { foodId: 'ni_003', quantity: 2, note: '2 Ragi Rotis' },
        { foodId: 'co_008', quantity: 1, note: 'Grilled Vegetables' },
      ],
    },
    saturday: {
      breakfast: [
        { foodId: 'si_011', quantity: 1, note: 'Upma' },
        { foodId: 'si_006', quantity: 1, note: 'Coconut Chutney' },
        { foodId: 'bv_001', quantity: 1, note: 'Coffee' },
      ],
      midMorning: [
        { foodId: 'eg_001', quantity: 1, note: '1 Boiled Egg' },
        { foodId: 'sn_003', quantity: 1, note: 'Fruit Bowl' },
      ],
      lunch: [
        { foodId: 'si_019', quantity: 1, note: 'Brown Rice' },
        { foodId: 'si_015', quantity: 1, note: 'Aviyal' },
        { foodId: 'ni_010', quantity: 1, note: 'Toor Dal' },
        { foodId: 'si_007', quantity: 1, note: 'Rasam' },
      ],
      snack: [
        { foodId: 'sn_006', quantity: 1, note: 'Sprouts Salad' },
      ],
      dinner: [
        { foodId: 'si_017', quantity: 1, note: 'Curd Rice' },
        { foodId: 'si_016', quantity: 2, note: 'Roasted Papadum' },
        { foodId: 'si_007', quantity: 1, note: 'Rasam' },
      ],
    },
    sunday: {
      breakfast: [
        { foodId: 'si_014', quantity: 2, note: '2 Appams' },
        { foodId: 'ni_010', quantity: 1, note: 'Dal' },
        { foodId: 'bv_003', quantity: 1, note: 'Turmeric Milk' },
      ],
      midMorning: [
        { foodId: 'eg_005', quantity: 1, note: 'Egg Bhurji' },
      ],
      lunch: [
        { foodId: 'ch_004', quantity: 1, note: 'Tandoori Chicken' },
        { foodId: 'ni_003', quantity: 2, note: '2 Ragi Rotis' },
        { foodId: 'co_005', quantity: 1, note: 'Green Salad' },
        { foodId: 'sn_004', quantity: 1, note: 'Buttermilk' },
      ],
      snack: [
        { foodId: 'sn_005', quantity: 1, note: 'Coconut Water' },
        { foodId: 'co_009', quantity: 1, note: 'Hummus with veggies' },
      ],
      dinner: [
        { foodId: 'si_009', quantity: 1, note: 'Moong Dal Soup' },
        { foodId: 'ni_002', quantity: 2, note: '2 Rotis' },
        { foodId: 'ni_006', quantity: 1, note: 'Mixed Veg Curry' },
      ],
    },
  },
};

// Meal type labels and timing
export const MealTypes = [
  { key: 'breakfast', label: 'Breakfast', time: '7:30 AM', icon: '🌅' },
  { key: 'midMorning', label: 'Mid-Morning', time: '10:30 AM', icon: '🌤️' },
  { key: 'lunch', label: 'Lunch', time: '1:00 PM', icon: '🍛' },
  { key: 'snack', label: 'Evening Snack', time: '4:30 PM', icon: '🌿' },
  { key: 'dinner', label: 'Dinner', time: '7:30 PM', icon: '🌙' },
];

export const DayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export default MealPlans;
