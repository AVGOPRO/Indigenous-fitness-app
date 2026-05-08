// Nalam — Food Database
// South Indian + North Indian + Continental | Eggs + Chicken included
// All values per 100g OR per standard serving (noted)
// Calories in kcal | Protein, Carbs, Fat in grams

export const FoodDatabase = [
  // ─── SOUTH INDIAN ───────────────────────────────────────
  { id: 'si_001', name: 'Idli (1 piece)', category: 'South Indian', calories: 39, protein: 1.9, carbs: 7.8, fat: 0.4, serving: '1 piece (30g)', icon: '🥟' },
  { id: 'si_002', name: 'Plain Dosa', category: 'South Indian', calories: 133, protein: 3.5, carbs: 25, fat: 2.5, serving: '1 dosa (80g)', icon: '🫓' },
  { id: 'si_003', name: 'Oats Dosa', category: 'South Indian', calories: 115, protein: 5, carbs: 20, fat: 2, serving: '1 dosa (80g)', icon: '🫓' },
  { id: 'si_004', name: 'Ragi Dosa', category: 'South Indian', calories: 108, protein: 3.8, carbs: 22, fat: 1.5, serving: '1 dosa (80g)', icon: '🫓' },
  { id: 'si_005', name: 'Sambar (1 cup)', category: 'South Indian', calories: 75, protein: 4.5, carbs: 10, fat: 1.5, serving: '1 cup (200ml)', icon: '🍲' },
  { id: 'si_006', name: 'Coconut Chutney', category: 'South Indian', calories: 80, protein: 1, carbs: 3, fat: 7, serving: '2 tbsp (30g)', icon: '🥥' },
  { id: 'si_007', name: 'Rasam (1 cup)', category: 'South Indian', calories: 40, protein: 2, carbs: 6, fat: 1, serving: '1 cup (200ml)', icon: '🍵' },
  { id: 'si_008', name: 'Vegetable Kootu', category: 'South Indian', calories: 110, protein: 4.5, carbs: 14, fat: 4, serving: '1 cup (150g)', icon: '🥗' },
  { id: 'si_009', name: 'Moong Dal Soup', category: 'South Indian', calories: 120, protein: 8, carbs: 18, fat: 1.5, serving: '1 cup (200ml)', icon: '🍲' },
  { id: 'si_010', name: 'Pongal (Ven)', category: 'South Indian', calories: 185, protein: 6, carbs: 28, fat: 5, serving: '1 cup (150g)', icon: '🍚' },
  { id: 'si_011', name: 'Upma', category: 'South Indian', calories: 170, protein: 4, carbs: 28, fat: 4.5, serving: '1 cup (150g)', icon: '🍚' },
  { id: 'si_012', name: 'Puttu + Kadala Curry', category: 'South Indian', calories: 290, protein: 12, carbs: 42, fat: 5, serving: '1 plate', icon: '🍽️' },
  { id: 'si_013', name: 'Idiyappam (2 pieces)', category: 'South Indian', calories: 110, protein: 2.5, carbs: 24, fat: 0.5, serving: '2 pieces', icon: '🍜' },
  { id: 'si_014', name: 'Appam', category: 'South Indian', calories: 120, protein: 3, carbs: 22, fat: 2.5, serving: '1 appam', icon: '🫓' },
  { id: 'si_015', name: 'Aviyal', category: 'South Indian', calories: 130, protein: 3, carbs: 12, fat: 7, serving: '1 cup (150g)', icon: '🥗' },
  { id: 'si_016', name: 'Papadum (roasted)', category: 'South Indian', calories: 50, protein: 2.5, carbs: 7.5, fat: 1, serving: '1 piece', icon: '🫓' },
  { id: 'si_017', name: 'Curd Rice', category: 'South Indian', calories: 160, protein: 5, carbs: 27, fat: 3.5, serving: '1 cup (150g)', icon: '🍚' },
  { id: 'si_018', name: 'Mor Kuzhambu', category: 'South Indian', calories: 70, protein: 3, carbs: 6, fat: 3, serving: '1 cup', icon: '🍲' },
  { id: 'si_019', name: 'Steamed Brown Rice', category: 'South Indian', calories: 215, protein: 5, carbs: 45, fat: 1.5, serving: '1 cup cooked (180g)', icon: '🍚' },
  { id: 'si_020', name: 'Kanji (Rice Porridge)', category: 'South Indian', calories: 90, protein: 2, carbs: 18, fat: 0.5, serving: '1 bowl (250ml)', icon: '🍵' },

  // ─── NORTH INDIAN ────────────────────────────────────────
  { id: 'ni_001', name: 'Dal Tadka', category: 'North Indian', calories: 130, protein: 9, carbs: 18, fat: 3, serving: '1 cup (200ml)', icon: '🍲' },
  { id: 'ni_002', name: 'Roti (Whole Wheat)', category: 'North Indian', calories: 71, protein: 2.7, carbs: 15, fat: 0.4, serving: '1 roti (30g)', icon: '🫓' },
  { id: 'ni_003', name: 'Ragi Roti', category: 'North Indian', calories: 65, protein: 2.5, carbs: 13.5, fat: 0.5, serving: '1 roti (30g)', icon: '🫓' },
  { id: 'ni_004', name: 'Rajma (Kidney Beans)', category: 'North Indian', calories: 144, protein: 9, carbs: 23, fat: 0.8, serving: '1 cup (200g)', icon: '🍛' },
  { id: 'ni_005', name: 'Palak Paneer (small)', category: 'North Indian', calories: 240, protein: 14, carbs: 10, fat: 16, serving: '1 serving (150g)', icon: '🍛' },
  { id: 'ni_006', name: 'Mixed Vegetable Curry', category: 'North Indian', calories: 100, protein: 3, carbs: 13, fat: 4, serving: '1 cup (150g)', icon: '🥗' },
  { id: 'ni_007', name: 'Khichdi', category: 'North Indian', calories: 175, protein: 7, carbs: 30, fat: 3, serving: '1 cup (180g)', icon: '🍚' },
  { id: 'ni_008', name: 'Chole (Chickpeas)', category: 'North Indian', calories: 165, protein: 9, carbs: 27, fat: 3, serving: '1 cup (200g)', icon: '🍛' },
  { id: 'ni_009', name: 'Lauki Sabzi', category: 'North Indian', calories: 45, protein: 1.5, carbs: 7, fat: 1.5, serving: '1 cup (150g)', icon: '🥗' },
  { id: 'ni_010', name: 'Toor Dal', category: 'North Indian', calories: 120, protein: 8, carbs: 20, fat: 1, serving: '1 cup (200ml)', icon: '🍲' },

  // ─── EGGS ────────────────────────────────────────────────
  { id: 'eg_001', name: 'Boiled Egg (whole)', category: 'Eggs', calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, serving: '1 large egg', icon: '🥚' },
  { id: 'eg_002', name: 'Egg White (boiled)', category: 'Eggs', calories: 17, protein: 3.6, carbs: 0.2, fat: 0.1, serving: '1 egg white', icon: '🥚' },
  { id: 'eg_003', name: 'Scrambled Eggs (2)', category: 'Eggs', calories: 182, protein: 12, carbs: 2, fat: 13, serving: '2 eggs with minimal oil', icon: '🍳' },
  { id: 'eg_004', name: 'Vegetable Omelette (2 eggs)', category: 'Eggs', calories: 195, protein: 13, carbs: 5, fat: 13, serving: '1 omelette', icon: '🍳' },
  { id: 'eg_005', name: 'Egg Bhurji', category: 'Eggs', calories: 220, protein: 14, carbs: 6, fat: 15, serving: '2 eggs bhurji', icon: '🍳' },
  { id: 'eg_006', name: 'Egg Curry (2 eggs)', category: 'Eggs', calories: 280, protein: 16, carbs: 10, fat: 18, serving: '1 serving', icon: '🍛' },
  { id: 'eg_007', name: 'Poached Egg', category: 'Eggs', calories: 71, protein: 6.3, carbs: 0.4, fat: 5, serving: '1 egg', icon: '🥚' },

  // ─── CHICKEN ─────────────────────────────────────────────
  { id: 'ch_001', name: 'Grilled Chicken Breast', category: 'Chicken', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g cooked', icon: '🍗' },
  { id: 'ch_002', name: 'Chicken Curry (light)', category: 'Chicken', calories: 220, protein: 25, carbs: 8, fat: 9, serving: '1 serving (150g)', icon: '🍛' },
  { id: 'ch_003', name: 'Chicken Soup', category: 'Chicken', calories: 120, protein: 18, carbs: 5, fat: 3, serving: '1 bowl (250ml)', icon: '🍲' },
  { id: 'ch_004', name: 'Tandoori Chicken', category: 'Chicken', calories: 190, protein: 28, carbs: 5, fat: 6, serving: '100g', icon: '🍗' },
  { id: 'ch_005', name: 'Pepper Chicken (dry)', category: 'Chicken', calories: 210, protein: 26, carbs: 4, fat: 10, serving: '100g', icon: '🍗' },
  { id: 'ch_006', name: 'Chicken Stir Fry (veggies)', category: 'Chicken', calories: 185, protein: 22, carbs: 8, fat: 7, serving: '1 serving (150g)', icon: '🥗' },

  // ─── CONTINENTAL ─────────────────────────────────────────
  { id: 'co_001', name: 'Oatmeal (plain)', category: 'Continental', calories: 150, protein: 5, carbs: 27, fat: 2.5, serving: '1 cup cooked (240g)', icon: '🥣' },
  { id: 'co_002', name: 'Greek Yogurt (plain)', category: 'Continental', calories: 100, protein: 10, carbs: 6, fat: 2, serving: '150g', icon: '🥛' },
  { id: 'co_003', name: 'Banana', category: 'Continental', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: '1 medium (118g)', icon: '🍌' },
  { id: 'co_004', name: 'Apple', category: 'Continental', calories: 72, protein: 0.4, carbs: 19, fat: 0.2, serving: '1 medium (150g)', icon: '🍎' },
  { id: 'co_005', name: 'Mixed Green Salad', category: 'Continental', calories: 35, protein: 2, carbs: 5, fat: 0.5, serving: '1 bowl (100g)', icon: '🥗' },
  { id: 'co_006', name: 'Multigrain Bread (1 slice)', category: 'Continental', calories: 69, protein: 3.5, carbs: 12, fat: 1, serving: '1 slice (28g)', icon: '🍞' },
  { id: 'co_007', name: 'Peanut Butter (natural)', category: 'Continental', calories: 188, protein: 8, carbs: 6, fat: 16, serving: '2 tbsp (32g)', icon: '🥜' },
  { id: 'co_008', name: 'Grilled Vegetables', category: 'Continental', calories: 80, protein: 2, carbs: 14, fat: 2, serving: '1 cup (150g)', icon: '🥦' },
  { id: 'co_009', name: 'Hummus', category: 'Continental', calories: 110, protein: 5, carbs: 10, fat: 6, serving: '3 tbsp (45g)', icon: '🫘' },
  { id: 'co_010', name: 'Lentil Soup', category: 'Continental', calories: 130, protein: 9, carbs: 20, fat: 1, serving: '1 bowl (250ml)', icon: '🍲' },

  // ─── SNACKS ──────────────────────────────────────────────
  { id: 'sn_001', name: 'Roasted Chana', category: 'Snacks', calories: 120, protein: 7, carbs: 19, fat: 2.5, serving: '30g', icon: '🫘' },
  { id: 'sn_002', name: 'Makhana (Fox Nuts)', category: 'Snacks', calories: 90, protein: 4, carbs: 17, fat: 0.5, serving: '20g dry roasted', icon: '⚪' },
  { id: 'sn_003', name: 'Fruit Bowl (seasonal)', category: 'Snacks', calories: 80, protein: 1, carbs: 20, fat: 0.3, serving: '1 bowl (150g)', icon: '🍉' },
  { id: 'sn_004', name: 'Buttermilk (Chaas)', category: 'Snacks', calories: 30, protein: 2, carbs: 3, fat: 0.5, serving: '1 glass (200ml)', icon: '🥛' },
  { id: 'sn_005', name: 'Coconut Water', category: 'Snacks', calories: 45, protein: 0.5, carbs: 9, fat: 0.5, serving: '1 glass (240ml)', icon: '🥥' },
  { id: 'sn_006', name: 'Sprouts Salad', category: 'Snacks', calories: 85, protein: 6, carbs: 14, fat: 0.5, serving: '1 cup (100g)', icon: '🌱' },

  // ─── BEVERAGES ───────────────────────────────────────────
  { id: 'bv_001', name: 'Black Coffee', category: 'Beverages', calories: 5, protein: 0.3, carbs: 0.5, fat: 0, serving: '1 cup (240ml)', icon: '☕' },
  { id: 'bv_002', name: 'Green Tea', category: 'Beverages', calories: 2, protein: 0, carbs: 0.5, fat: 0, serving: '1 cup', icon: '🍵' },
  { id: 'bv_003', name: 'Turmeric Milk (low fat)', category: 'Beverages', calories: 80, protein: 4, carbs: 8, fat: 2, serving: '1 cup (200ml)', icon: '🥛' },
  { id: 'bv_004', name: 'Jeera Water', category: 'Beverages', calories: 5, protein: 0, carbs: 1, fat: 0, serving: '1 glass (200ml)', icon: '💧' },
];

export const FoodCategories = [
  'All', 'South Indian', 'North Indian', 'Eggs', 'Chicken', 'Continental', 'Snacks', 'Beverages'
];

export default FoodDatabase;
