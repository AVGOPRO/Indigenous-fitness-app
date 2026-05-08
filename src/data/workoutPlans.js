// Nalam — Workout Plans
// Designed for overweight/obese beginners
// Week 1–4: Low-impact → Week 5–8: Moderate → Week 9+: Progressive
// 5 days/week | Weekends = active rest (walking, stretching)

export const WorkoutPlans = {
  beginner: {
    label: 'Beginner (Weeks 1–4)',
    description: 'Low-impact exercises to build habit and joint strength',
    days: {
      monday: {
        focus: 'Full Body Activation',
        icon: '🌅',
        warmup: [
          { name: 'Neck Rolls', duration: 60, reps: null, sets: 2, rest: 30, instruction: 'Slow circular neck movement, 5 each side' },
          { name: 'Shoulder Circles', duration: 60, reps: null, sets: 2, rest: 30, instruction: 'Arms out, draw big circles forward and back' },
          { name: 'March in Place', duration: 120, reps: null, sets: 1, rest: 30, instruction: 'Lift knees gently, swing arms naturally' },
        ],
        exercises: [
          { id: 'w_001', name: 'Wall Push-ups', sets: 3, reps: 10, rest: 60, category: 'Upper Body', instruction: 'Stand arm-length from wall. Push and return slowly.', emoji: '🏋️' },
          { id: 'w_002', name: 'Seated Leg Raises', sets: 3, reps: 12, rest: 45, category: 'Core', instruction: 'Sit upright on chair. Lift one leg, hold 2 sec, lower.', emoji: '🦵' },
          { id: 'w_003', name: 'Chair Squats', sets: 3, reps: 10, rest: 60, category: 'Lower Body', instruction: 'Lower to chair, barely touch, stand back up. Keep chest up.', emoji: '🪑' },
          { id: 'w_004', name: 'Standing Calf Raises', sets: 3, reps: 15, rest: 45, category: 'Lower Body', instruction: 'Rise on toes, hold 2 sec, lower. Use wall for balance.', emoji: '🦶' },
          { id: 'w_005', name: 'Deep Breathing (Diaphragm)', sets: 1, reps: null, duration: 120, rest: 0, category: 'Core', instruction: 'Breathe in 4 sec, hold 2, out 6. Belly expands, not chest.', emoji: '🌬️' },
        ],
        cooldown: 'Gentle full-body stretch | 5 minutes',
        totalTime: 30,
        calories: 120,
      },
      tuesday: {
        focus: 'Walk + Core',
        icon: '🚶',
        warmup: [
          { name: 'Ankle Rolls', duration: 60, reps: null, sets: 2, rest: 20, instruction: '10 rotations each ankle' },
          { name: 'Hip Circles', duration: 60, reps: null, sets: 2, rest: 20, instruction: 'Hands on hips, draw big circles' },
        ],
        exercises: [
          { id: 'w_006', name: 'Brisk Walk', sets: 1, reps: null, duration: 1200, rest: 0, category: 'Cardio', instruction: '20-minute walk at a pace where you can talk but feel warm.', emoji: '🚶' },
          { id: 'w_007', name: 'Seated Ab Press', sets: 3, reps: 15, rest: 45, category: 'Core', instruction: 'Sit in chair, press hands on belly and breathe out hard.', emoji: '💪' },
          { id: 'w_008', name: 'Side Bends (standing)', sets: 3, reps: 12, rest: 30, category: 'Core', instruction: 'Hands at side, slide hand down leg gently each side.', emoji: '🤸' },
          { id: 'w_009', name: 'Calf Raises (wall support)', sets: 3, reps: 15, rest: 30, category: 'Lower Body', instruction: 'Both feet rise. Slow and controlled.', emoji: '🦶' },
        ],
        cooldown: 'Seated hamstring stretch + butterfly stretch | 5 min',
        totalTime: 40,
        calories: 180,
      },
      wednesday: {
        focus: 'Upper Body Strength',
        icon: '💪',
        warmup: [
          { name: 'Arm Swings', duration: 60, reps: null, sets: 2, rest: 20, instruction: 'Swing arms across chest and back, 20 times' },
          { name: 'Wrist Rotations', duration: 30, reps: null, sets: 2, rest: 15, instruction: 'Rotate wrists clockwise and anti-clockwise' },
        ],
        exercises: [
          { id: 'w_010', name: 'Incline Wall Push-ups', sets: 3, reps: 12, rest: 60, category: 'Upper Body', instruction: 'Hands higher on wall for easier variation.', emoji: '🏋️' },
          { id: 'w_011', name: 'Chair Dips', sets: 3, reps: 8, rest: 60, category: 'Upper Body', instruction: 'Hands on chair edge, dip your body gently. Don\'t go too deep.', emoji: '🪑' },
          { id: 'w_012', name: 'Resistance Band Row (or towel pull)', sets: 3, reps: 12, rest: 45, category: 'Upper Body', instruction: 'Wrap towel around door handle, pull elbows back. Squeeze shoulder blades.', emoji: '🏋️' },
          { id: 'w_013', name: 'Overhead Arm Reach', sets: 3, reps: 10, rest: 30, category: 'Upper Body', instruction: 'Reach both arms overhead alternately with light stretch.', emoji: '🙌' },
        ],
        cooldown: 'Chest opener stretch + tricep stretch | 5 min',
        totalTime: 30,
        calories: 130,
      },
      thursday: {
        focus: 'Walk + Lower Body',
        icon: '🦵',
        warmup: [
          { name: 'Leg Swings', duration: 60, reps: null, sets: 2, rest: 20, instruction: 'Hold wall, swing leg forward-back gently, 10 each' },
          { name: 'Knee Lifts in Place', duration: 60, reps: null, sets: 1, rest: 20, instruction: 'Slow, controlled knee lift to hip height' },
        ],
        exercises: [
          { id: 'w_014', name: 'Brisk Walk', sets: 1, reps: null, duration: 1200, rest: 0, category: 'Cardio', instruction: '20 minutes. Try to beat your previous pace slightly.', emoji: '🚶' },
          { id: 'w_015', name: 'Step Touches (side to side)', sets: 3, reps: 20, rest: 30, category: 'Cardio', instruction: 'Step right foot to right, bring left to meet it. Repeat left.', emoji: '💃' },
          { id: 'w_016', name: 'Wall Sit (hold)', sets: 3, reps: null, duration: 20, rest: 60, category: 'Lower Body', instruction: 'Back against wall, knees at 90°. Hold for 20 seconds.', emoji: '🧱' },
          { id: 'w_017', name: 'Standing Hip Abduction', sets: 3, reps: 12, rest: 30, category: 'Lower Body', instruction: 'Hold wall, lift leg to the side slowly. Both sides.', emoji: '🦵' },
        ],
        cooldown: 'Quad stretch + calf stretch | 5 min',
        totalTime: 40,
        calories: 170,
      },
      friday: {
        focus: 'Yoga & Flexibility',
        icon: '🧘',
        warmup: [
          { name: 'Child\'s Pose', duration: 60, reps: null, sets: 1, rest: 0, instruction: 'Kneel, sit back on heels, arms forward, breathe slowly.' },
          { name: 'Cat-Cow Stretch', duration: 60, reps: null, sets: 2, rest: 20, instruction: 'On hands and knees. Arch up (cat), dip down (cow).' },
        ],
        exercises: [
          { id: 'w_018', name: 'Mountain Pose (Tadasana)', sets: 1, reps: null, duration: 60, rest: 0, category: 'Yoga', instruction: 'Stand tall, feet hip-width. Press feet down. Breathe deeply.', emoji: '🧘' },
          { id: 'w_019', name: 'Chair Pose (Utkatasana, modified)', sets: 3, reps: null, duration: 20, rest: 45, category: 'Yoga', instruction: 'Bend knees as if sitting in chair. Arms up. Hold and breathe.', emoji: '🪑' },
          { id: 'w_020', name: 'Tree Pose (Vrikshasana, wall)', sets: 3, reps: null, duration: 20, rest: 30, category: 'Yoga', instruction: 'Stand near wall for support. Bring one foot to ankle. Balance.', emoji: '🌳' },
          { id: 'w_021', name: 'Warrior I (Virabhadrasana)', sets: 3, reps: null, duration: 20, rest: 45, category: 'Yoga', instruction: 'Step forward, front knee bent. Arms raise. Look forward. Breathe.', emoji: '⚔️' },
          { id: 'w_022', name: 'Corpse Pose (Savasana)', sets: 1, reps: null, duration: 300, rest: 0, category: 'Yoga', instruction: 'Lie flat. Arms at side. Close eyes. Full body relax. 5 minutes.', emoji: '😴' },
        ],
        cooldown: 'Included in session',
        totalTime: 35,
        calories: 100,
      },
    },
    weekend: {
      saturday: { focus: 'Active Rest — 30 min easy walk or swimming', icon: '🌿', calories: 150 },
      sunday: { focus: 'Rest & Recovery — stretching only', icon: '😌', calories: 50 },
    },
  },
};

export const WorkoutLevels = [
  { key: 'beginner', label: 'Beginner', description: 'Weeks 1–4 | Low impact', weeks: '1-4' },
  { key: 'intermediate', label: 'Intermediate', description: 'Weeks 5–8 | Moderate intensity', weeks: '5-8' },
  { key: 'advanced', label: 'Progressive', description: 'Weeks 9+ | Building strength', weeks: '9+' },
];

export const WorkoutDayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export default WorkoutPlans;
