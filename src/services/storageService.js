// Nalam — Local Storage Service (expo-sqlite)
// Handles all CRUD for user data, diet logs, workout logs, progress

import * as SQLite from 'expo-sqlite';

let db = null;

const getDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('nalam.db');
  }
  return db;
};

export const StorageService = {
  // ─── DATABASE INIT ────────────────────────────────────────
  async initDatabase() {
    const database = await getDB();
    await database.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        gender TEXT,
        height_cm REAL,
        start_weight REAL,
        current_weight REAL,
        target_weight REAL,
        activity_level TEXT,
        calorie_goal INTEGER,
        water_goal_glasses INTEGER,
        onboarding_complete INTEGER DEFAULT 0,
        created_at TEXT
      );

      CREATE TABLE IF NOT EXISTS diet_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        meal_type TEXT,
        food_id TEXT,
        food_name TEXT,
        calories REAL,
        protein REAL,
        carbs REAL,
        fat REAL,
        quantity REAL DEFAULT 1,
        logged_at TEXT
      );

      CREATE TABLE IF NOT EXISTS water_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        glasses_count INTEGER DEFAULT 0,
        goal_glasses INTEGER DEFAULT 8
      );

      CREATE TABLE IF NOT EXISTS workout_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        day_name TEXT,
        focus TEXT,
        completed INTEGER DEFAULT 0,
        calories_burned INTEGER DEFAULT 0,
        duration_minutes INTEGER DEFAULT 0,
        completed_at TEXT
      );

      CREATE TABLE IF NOT EXISTS meditation_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        session_id TEXT,
        session_name TEXT,
        duration_minutes INTEGER,
        completed_at TEXT
      );

      CREATE TABLE IF NOT EXISTS weight_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        weight_kg REAL,
        notes TEXT,
        logged_at TEXT
      );
    `);
  },

  // ─── USER PROFILE ─────────────────────────────────────────
  async saveProfile(profile) {
    const database = await getDB();
    const existing = await database.getFirstAsync('SELECT id FROM user_profile LIMIT 1');
    const now = new Date().toISOString();
    if (existing) {
      await database.runAsync(
        `UPDATE user_profile SET name=?, age=?, gender=?, height_cm=?, start_weight=?,
         current_weight=?, target_weight=?, activity_level=?, calorie_goal=?,
         water_goal_glasses=?, onboarding_complete=? WHERE id=?`,
        [profile.name, profile.age, profile.gender, profile.heightCm,
         profile.startWeight, profile.currentWeight, profile.targetWeight,
         profile.activityLevel, profile.calorieGoal, profile.waterGoalGlasses,
         profile.onboardingComplete ? 1 : 0, existing.id]
      );
    } else {
      await database.runAsync(
        `INSERT INTO user_profile (name,age,gender,height_cm,start_weight,current_weight,
         target_weight,activity_level,calorie_goal,water_goal_glasses,onboarding_complete,created_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [profile.name, profile.age, profile.gender, profile.heightCm,
         profile.startWeight, profile.currentWeight, profile.targetWeight,
         profile.activityLevel, profile.calorieGoal, profile.waterGoalGlasses,
         profile.onboardingComplete ? 1 : 0, now]
      );
    }
  },

  async getProfile() {
    const database = await getDB();
    return await database.getFirstAsync('SELECT * FROM user_profile LIMIT 1');
  },

  // ─── DIET LOGS ────────────────────────────────────────────
  async logFood(date, mealType, foodItem) {
    const database = await getDB();
    await database.runAsync(
      `INSERT INTO diet_logs (date,meal_type,food_id,food_name,calories,protein,carbs,fat,quantity,logged_at)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [date, mealType, foodItem.id, foodItem.name, foodItem.calories,
       foodItem.protein, foodItem.carbs, foodItem.fat,
       foodItem.quantity || 1, new Date().toISOString()]
    );
  },

  async getDietLog(date) {
    const database = await getDB();
    return await database.getAllAsync('SELECT * FROM diet_logs WHERE date=? ORDER BY logged_at', [date]);
  },

  async deleteFoodLog(id) {
    const database = await getDB();
    await database.runAsync('DELETE FROM diet_logs WHERE id=?', [id]);
  },

  async getDailyCalories(date) {
    const database = await getDB();
    const result = await database.getFirstAsync(
      'SELECT SUM(calories * quantity) as total FROM diet_logs WHERE date=?', [date]
    );
    return result?.total || 0;
  },

  // ─── WATER LOGS ───────────────────────────────────────────
  async getWaterLog(date) {
    const database = await getDB();
    return await database.getFirstAsync('SELECT * FROM water_logs WHERE date=?', [date]);
  },

  async updateWaterLog(date, glasses, goalGlasses) {
    const database = await getDB();
    const existing = await database.getFirstAsync('SELECT id FROM water_logs WHERE date=?', [date]);
    if (existing) {
      await database.runAsync('UPDATE water_logs SET glasses_count=? WHERE date=?', [glasses, date]);
    } else {
      await database.runAsync(
        'INSERT INTO water_logs (date,glasses_count,goal_glasses) VALUES (?,?,?)',
        [date, glasses, goalGlasses]
      );
    }
  },

  // ─── WORKOUT LOGS ─────────────────────────────────────────
  async logWorkout(date, dayName, focus, caloriesBurned, durationMinutes) {
    const database = await getDB();
    const existing = await database.getFirstAsync('SELECT id FROM workout_logs WHERE date=?', [date]);
    if (existing) {
      await database.runAsync(
        'UPDATE workout_logs SET completed=1,calories_burned=?,duration_minutes=?,completed_at=? WHERE date=?',
        [caloriesBurned, durationMinutes, new Date().toISOString(), date]
      );
    } else {
      await database.runAsync(
        `INSERT INTO workout_logs (date,day_name,focus,completed,calories_burned,duration_minutes,completed_at)
         VALUES (?,?,?,1,?,?,?)`,
        [date, dayName, focus, caloriesBurned, durationMinutes, new Date().toISOString()]
      );
    }
  },

  async getWorkoutLog(date) {
    const database = await getDB();
    return await database.getFirstAsync('SELECT * FROM workout_logs WHERE date=?', [date]);
  },

  async getWorkoutStreak() {
    const database = await getDB();
    const logs = await database.getAllAsync(
      'SELECT date FROM workout_logs WHERE completed=1 ORDER BY date DESC LIMIT 30'
    );
    if (!logs.length) return 0;
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[i].date);
      const expected = new Date(today);
      expected.setDate(today.getDate() - i);
      if (logDate.toDateString() === expected.toDateString()) streak++;
      else break;
    }
    return streak;
  },

  // ─── MEDITATION LOGS ─────────────────────────────────────
  async logMeditation(date, sessionId, sessionName, durationMinutes) {
    const database = await getDB();
    await database.runAsync(
      'INSERT INTO meditation_logs (date,session_id,session_name,duration_minutes,completed_at) VALUES (?,?,?,?,?)',
      [date, sessionId, sessionName, durationMinutes, new Date().toISOString()]
    );
  },

  async getMeditationLog(date) {
    const database = await getDB();
    return await database.getAllAsync('SELECT * FROM meditation_logs WHERE date=? ORDER BY completed_at', [date]);
  },

  // ─── WEIGHT LOGS ─────────────────────────────────────────
  async logWeight(date, weightKg, notes = '') {
    const database = await getDB();
    const existing = await database.getFirstAsync('SELECT id FROM weight_logs WHERE date=?', [date]);
    if (existing) {
      await database.runAsync('UPDATE weight_logs SET weight_kg=?,notes=? WHERE date=?', [weightKg, notes, date]);
    } else {
      await database.runAsync(
        'INSERT INTO weight_logs (date,weight_kg,notes,logged_at) VALUES (?,?,?,?)',
        [date, weightKg, notes, new Date().toISOString()]
      );
    }
    // Update current_weight in profile
    await database.runAsync('UPDATE user_profile SET current_weight=? WHERE id=(SELECT id FROM user_profile LIMIT 1)', [weightKg]);
  },

  async getWeightLogs(limitDays = 90) {
    const database = await getDB();
    return await database.getAllAsync(
      'SELECT * FROM weight_logs ORDER BY date DESC LIMIT ?', [limitDays]
    );
  },

  async getLatestWeight() {
    const database = await getDB();
    const result = await database.getFirstAsync('SELECT weight_kg FROM weight_logs ORDER BY date DESC LIMIT 1');
    return result?.weight_kg || null;
  },

  // ─── REPORTS ─────────────────────────────────────────────
  async getWeeklyStats(startDate, endDate) {
    const database = await getDB();
    const [calories, workouts, meditations] = await Promise.all([
      database.getAllAsync('SELECT date, SUM(calories*quantity) as total FROM diet_logs WHERE date BETWEEN ? AND ? GROUP BY date', [startDate, endDate]),
      database.getAllAsync('SELECT * FROM workout_logs WHERE date BETWEEN ? AND ? AND completed=1', [startDate, endDate]),
      database.getAllAsync('SELECT * FROM meditation_logs WHERE date BETWEEN ? AND ?', [startDate, endDate]),
    ]);
    return { calories, workouts, meditations };
  },
};

export default StorageService;
