// Nalam — Diet Screen
import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Modal, FlatList, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme/colors';
import { Spacing, Radius, Shadow } from '../theme/spacing';
import { FontSize, FontWeight } from '../theme/typography';
import useDietStore from '../store/dietStore';
import useUserStore from '../store/userStore';
import WaterTracker from '../components/diet/WaterTracker';
import RingProgress from '../components/common/RingProgress';
import { MealTypes } from '../data/mealPlans';

const DietScreen = () => {
  const { loadTodayData, todayLogs, totalCalories, waterGlasses, waterGoal,
          logFood, deleteFoodLog, addWaterGlass, removeWaterGlass, getLogsByMealType,
          searchFood, setWaterGoal } = useDietStore();
  const profile = useUserStore(s => s.profile);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // Issue #8: custom food entry state
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCals, setCustomCals] = useState('');

  useEffect(() => {
    loadTodayData();
  }, []);

  // BUG-007 fix: seed the profile's weight-based water goal into the diet store
  // when the stored value is still the default fallback of 8.
  useEffect(() => {
    if (profile?.waterGoalGlasses && waterGoal === 8 && profile.waterGoalGlasses !== 8) {
      setWaterGoal(profile.waterGoalGlasses);
    }
  }, [profile?.waterGoalGlasses, waterGoal]);

  const handleSearch = (q) => {
    setSearchQuery(q);
    setSearchResults(q.length >= 2 ? searchFood(q) : []);
    setShowCustomForm(false); // reset custom form on new search
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setSearchQuery('');
    setSearchResults([]);
    setShowCustomForm(false);
    setCustomName('');
    setCustomCals('');
  };

  // Issue #8: log a user-defined custom food item
  const handleLogCustomFood = async () => {
    if (!customName.trim() || !customCals) {
      Alert.alert('Missing Info', 'Please enter a food name and calories.');
      return;
    }
    const cals = parseFloat(customCals);
    if (isNaN(cals) || cals < 0) {
      Alert.alert('Invalid', 'Please enter a valid calorie number.');
      return;
    }
    await logFood(selectedMealType, {
      id: `custom_${Date.now()}`,
      name: customName.trim(),
      calories: cals,
      protein: 0, carbs: 0, fat: 0,
      quantity: 1,
    });
    closeAddModal();
  };

  const handleLogFood = async (food) => {
    await logFood(selectedMealType, food);
    closeAddModal();
  };

  const calorieGoal = profile?.calorieGoal || 2000;
  const calProg = Math.min(1, totalCalories / calorieGoal);
  const caloriesLeft = Math.max(0, calorieGoal - totalCalories);
  const logsByMeal = getLogsByMealType();

  return (
    <ScrollView style={styles.screen}>
      {/* Header */}
      <LinearGradient colors={Colors.gradientPrimary} style={styles.header}>
        <Text style={styles.headerTitle}>🍛 Today's Nutrition</Text>
        <View style={styles.headerStats}>
          <RingProgress
            size={100} strokeWidth={10}
            progress={calProg}
            color={Colors.white} bgColor="rgba(255,255,255,0.25)"
            label={`${Math.round(totalCalories)}`} sublabel="kcal eaten"
          />
          <View style={styles.headerInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Goal</Text>
              <Text style={styles.infoVal}>{calorieGoal} kcal</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Eaten</Text>
              <Text style={styles.infoVal}>{Math.round(totalCalories)} kcal</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Left</Text>
              <Text style={[styles.infoVal, { color: caloriesLeft > 0 ? Colors.accentLight : Colors.error }]}>
                {Math.round(caloriesLeft)} kcal
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Water tracker */}
        <WaterTracker
          glasses={waterGlasses}
          goal={waterGoal || 8}
          onAdd={addWaterGlass}
          onRemove={removeWaterGlass}
        />

        {/* Meal sections */}
        {MealTypes.map(mealType => {
          const entries = logsByMeal[mealType.key] || [];
          const mealCals = entries.reduce((s, l) => s + l.calories * l.quantity, 0);
          return (
            <View key={mealType.key} style={styles.mealSection}>
              <View style={styles.mealHeader}>
                <View>
                  <Text style={styles.mealTitle}>{mealType.icon} {mealType.label}</Text>
                  <Text style={styles.mealTime}>{mealType.time}</Text>
                </View>
                <View style={styles.mealRight}>
                  {mealCals > 0 && <Text style={styles.mealCals}>{Math.round(mealCals)} kcal</Text>}
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => { setSelectedMealType(mealType.key); setShowAddModal(true); }}
                  >
                    <Ionicons name="add" size={18} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>

              {entries.length === 0 ? (
                <Text style={styles.emptyMeal}>Tap + to log your {mealType.label.toLowerCase()}</Text>
              ) : (
                entries.map(entry => (
                  <View key={entry.id} style={styles.foodEntry}>
                    <Text style={styles.foodName}>{entry.food_name}</Text>
                    <View style={styles.foodRight}>
                      <Text style={styles.foodCal}>{Math.round(entry.calories * entry.quantity)} kcal</Text>
                      <TouchableOpacity onPress={() => Alert.alert('Remove?', `Remove ${entry.food_name}?`, [
                        { text: 'Cancel' },
                        { text: 'Remove', style: 'destructive', onPress: () => deleteFoodLog(entry.id) },
                      ])}>
                        <Ionicons name="trash-outline" size={16} color={Colors.error} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          );
        })}
      </View>

      {/* Add Food Modal — Issue #7: onRequestClose fixes Android back button */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeAddModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Add to {MealTypes.find(m => m.key === selectedMealType)?.label}
            </Text>
            <TouchableOpacity onPress={closeAddModal}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search food (e.g. idli, egg, chicken...)"
              placeholderTextColor={Colors.textMuted}
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
          </View>

          <FlatList
            data={searchResults}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.foodResult} onPress={() => handleLogFood(item)}>
                <Text style={styles.foodResultIcon}>{item.icon}</Text>
                <View style={styles.foodResultInfo}>
                  <Text style={styles.foodResultName}>{item.name}</Text>
                  <Text style={styles.foodResultMeta}>{item.serving} · {item.category}</Text>
                </View>
                <View style={styles.foodResultCal}>
                  <Text style={styles.foodResultCalNum}>{item.calories}</Text>
                  <Text style={styles.foodResultCalLabel}>kcal</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              searchQuery.length >= 2 ? (
                // Issue #8: No results — offer custom food entry
                <View style={styles.customFoodSection}>
                  <Text style={styles.searchHint}>
                    {showCustomForm
                      ? '✏️ Add your custom food below:'
                      : `😕 No results for "${searchQuery}"`}
                  </Text>
                  {!showCustomForm ? (
                    <TouchableOpacity
                      style={styles.addCustomBtn}
                      onPress={() => { setCustomName(searchQuery); setShowCustomForm(true); }}
                    >
                      <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
                      <Text style={styles.addCustomBtnText}>Add "{searchQuery}" as custom food</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.customForm}>
                      <TextInput
                        style={styles.customInput}
                        placeholder="Food name"
                        placeholderTextColor={Colors.textMuted}
                        value={customName}
                        onChangeText={setCustomName}
                      />
                      <TextInput
                        style={styles.customInput}
                        placeholder="Calories (kcal)"
                        placeholderTextColor={Colors.textMuted}
                        keyboardType="numeric"
                        value={customCals}
                        onChangeText={setCustomCals}
                      />
                      <TouchableOpacity style={styles.customSaveBtn} onPress={handleLogCustomFood}>
                        <Text style={styles.customSaveBtnText}>✓ Add to {MealTypes.find(m => m.key === selectedMealType)?.label}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setShowCustomForm(false)} style={{ marginTop: 8, alignItems: 'center' }}>
                        <Text style={{ color: Colors.textMuted, fontSize: 13 }}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <Text style={styles.searchHint}>
                  {'🔍 Type at least 2 letters to search\n\n💡 Try: idli, dosa, egg, chicken, oats'}
                </Text>
              )
            }
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 56, paddingHorizontal: Spacing.base, paddingBottom: Spacing.xl },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white, marginBottom: Spacing.md },
  headerStats: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xl },
  headerInfo: { flex: 1, gap: Spacing.sm },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { fontSize: FontSize.sm, color: Colors.sandalwood },
  infoVal: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  content: { padding: Spacing.base },
  mealSection: { backgroundColor: Colors.surface, borderRadius: Radius.xl, padding: Spacing.base, marginBottom: Spacing.md, ...Shadow.sm },
  mealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  mealTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  mealTime: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  mealRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  mealCals: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.primary },
  addBtn: { width: 32, height: 32, borderRadius: Radius.full, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  emptyMeal: { fontSize: FontSize.sm, color: Colors.textMuted, fontStyle: 'italic', paddingVertical: Spacing.sm },
  foodEntry: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderTopWidth: 1, borderTopColor: Colors.sandalwood + '50' },
  foodName: { flex: 1, fontSize: FontSize.sm, color: Colors.textPrimary },
  foodRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  foodCal: { fontSize: FontSize.sm, fontWeight: FontWeight.semiBold, color: Colors.primary },
  modal: { flex: 1, backgroundColor: Colors.background, padding: Spacing.base },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md, paddingTop: Spacing.md },
  modalTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.md, gap: Spacing.sm, marginBottom: Spacing.md, borderWidth: 1.5, borderColor: Colors.sandalwood },
  searchInput: { flex: 1, fontSize: FontSize.base, color: Colors.textPrimary },
  foodResult: { flexDirection: 'row', alignItems: 'center', padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.sandalwood + '50', gap: Spacing.sm },
  foodResultIcon: { fontSize: 28 },
  foodResultInfo: { flex: 1 },
  foodResultName: { fontSize: FontSize.base, fontWeight: FontWeight.medium, color: Colors.textPrimary },
  foodResultMeta: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  foodResultCal: { alignItems: 'center' },
  foodResultCalNum: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.primary },
  foodResultCalLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  searchHint: { textAlign: 'center', padding: Spacing.xl, fontSize: FontSize.base, color: Colors.textMuted, lineHeight: 24 },
  // Issue #8: custom food entry styles
  customFoodSection: { padding: Spacing.base },
  addCustomBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, padding: Spacing.base, backgroundColor: Colors.primary + '12', borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.primary + '40', marginTop: Spacing.sm },
  addCustomBtnText: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.semiBold },
  customForm: { marginTop: Spacing.md, gap: Spacing.sm },
  customInput: { backgroundColor: Colors.surface, borderRadius: Radius.md, padding: Spacing.md, fontSize: FontSize.base, color: Colors.textPrimary, borderWidth: 1.5, borderColor: Colors.sandalwood },
  customSaveBtn: { backgroundColor: Colors.primary, borderRadius: Radius.full, padding: Spacing.md, alignItems: 'center', marginTop: Spacing.sm },
  customSaveBtnText: { color: Colors.white, fontWeight: FontWeight.bold, fontSize: FontSize.base },
});

export default DietScreen;
