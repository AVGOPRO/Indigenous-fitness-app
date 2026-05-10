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
        totalTime: 45,
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
        totalTime: 45,
        calories: 200,
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
        totalTime: 45,
        calories: 160,
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
        totalTime: 45,
        calories: 200,
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
        totalTime: 45,
        calories: 130,
      },
    },
    weekend: {
      saturday: { focus: 'Active Rest — 30 min easy walk or swimming', icon: '🌿', calories: 150 },
      sunday: { focus: 'Rest & Recovery — stretching only', icon: '😌', calories: 50 },
    },
  },
  intermediate: {
    label: 'Intermediate (Weeks 5–8)',
    description: 'Moderate intensity — more reps, harder moves, longer walks',
    days: {
      monday: {
        focus: 'Full Body Strength', icon: '💪',
        warmup: [
          { name: 'Jumping Jacks (low impact)', duration: 60, sets: 2, rest: 20, instruction: 'Step out instead of jumping if needed' },
          { name: 'Arm Circles + Hip Rotations', duration: 60, sets: 2, rest: 20, instruction: 'Big slow circles, 10 each direction' },
        ],
        exercises: [
          { id: 'i_001', name: 'Push-ups (knee)', sets: 3, reps: 12, rest: 60, category: 'Upper Body', instruction: 'On knees, chest to floor. Keep core tight.', emoji: '🏋️' },
          { id: 'i_002', name: 'Goblet Squat (bodyweight)', sets: 3, reps: 15, rest: 60, category: 'Lower Body', instruction: 'Feet wide, toes out, squat deep. Chest up.', emoji: '🦵' },
          { id: 'i_003', name: 'Plank Hold', sets: 3, reps: null, duration: 30, rest: 45, category: 'Core', instruction: 'Forearms on floor. Straight line head to heels. Breathe.', emoji: '🧱' },
          { id: 'i_004', name: 'Reverse Lunges', sets: 3, reps: 10, rest: 60, category: 'Lower Body', instruction: 'Step back, knee hovers above floor. Alternate legs.', emoji: '🦵' },
          { id: 'i_005', name: 'Dumbbell Row (towel)', sets: 3, reps: 12, rest: 45, category: 'Upper Body', instruction: 'Hinge forward, pull elbow back. Squeeze at top.', emoji: '🏋️' },
          { id: 'i_006', name: 'Bicycle Crunches', sets: 3, reps: 15, rest: 45, category: 'Core', instruction: 'Opposite elbow to knee. Slow and controlled.', emoji: '🚴' },
        ],
        cooldown: 'Full body stretch — focus on hips and shoulders | 5 min',
        totalTime: 45, calories: 250,
      },
      tuesday: {
        focus: 'Cardio + Core', icon: '🏃',
        warmup: [
          { name: 'March + Arm Reach', duration: 60, sets: 2, rest: 20, instruction: 'Lift knees high, reach arms overhead alternately' },
        ],
        exercises: [
          { id: 'i_007', name: 'Brisk Walk / Light Jog', sets: 1, reps: null, duration: 1800, rest: 0, category: 'Cardio', instruction: '30 min at a pace where speaking is slightly hard.', emoji: '🏃' },
          { id: 'i_008', name: 'Plank to Downward Dog', sets: 3, reps: 10, rest: 45, category: 'Core', instruction: 'From plank, push hips up to inverted V. Hold 2s, return.', emoji: '🧘' },
          { id: 'i_009', name: 'Side Plank (each side)', sets: 2, reps: null, duration: 20, rest: 30, category: 'Core', instruction: 'Stack feet or stagger. Keep hips lifted.', emoji: '🧱' },
        ],
        cooldown: 'Seated hamstring + pigeon pose | 5 min',
        totalTime: 45, calories: 280,
      },
      wednesday: {
        focus: 'Upper Body Power', icon: '💪',
        warmup: [
          { name: 'Band Pull-Aparts / Towel Pull', duration: 60, sets: 2, rest: 20, instruction: 'Hold towel wide, pull apart keeping arms straight' },
          { name: 'Wrist + Shoulder Warmup', duration: 60, sets: 2, rest: 15, instruction: 'Rotate wrists, shrug and roll shoulders' },
        ],
        exercises: [
          { id: 'i_010', name: 'Full Push-ups', sets: 3, reps: 10, rest: 60, category: 'Upper Body', instruction: 'Hands shoulder-width. Chest touches floor. Core tight.', emoji: '🏋️' },
          { id: 'i_011', name: 'Chair Dips (deeper)', sets: 3, reps: 12, rest: 60, category: 'Upper Body', instruction: 'Dip until elbows at 90°. Drive back up.', emoji: '🪑' },
          { id: 'i_012', name: 'Towel Row (explosive)', sets: 3, reps: 15, rest: 45, category: 'Upper Body', instruction: 'Pull hard and fast, release slowly. 2:1 tempo.', emoji: '🏋️' },
          { id: 'i_013', name: 'Overhead Press (water bottles)', sets: 3, reps: 12, rest: 45, category: 'Upper Body', instruction: 'Press overhead, lock out, lower slowly.', emoji: '🙌' },
          { id: 'i_014', name: 'Superman Hold', sets: 3, reps: null, duration: 20, rest: 30, category: 'Core', instruction: 'Lie prone, lift arms and legs. Squeeze glutes.', emoji: '🦸' },
        ],
        cooldown: 'Chest doorway stretch + tricep overhead stretch | 5 min',
        totalTime: 45, calories: 230,
      },
      thursday: {
        focus: 'Lower Body + HIIT', icon: '🦵',
        warmup: [
          { name: 'High Knees (30s)', duration: 30, sets: 3, rest: 15, instruction: 'Lift knees to hip height, pump arms' },
        ],
        exercises: [
          { id: 'i_015', name: 'Bodyweight Squats', sets: 4, reps: 20, rest: 45, category: 'Lower Body', instruction: 'Deep squat, drive through heels. Fast down, slow up.', emoji: '🦵' },
          { id: 'i_016', name: 'Step-ups (chair/step)', sets: 3, reps: 12, rest: 45, category: 'Lower Body', instruction: 'Step up, stand tall, step down. Alternate lead leg.', emoji: '🪜' },
          { id: 'i_017', name: 'Wall Sit (extended)', sets: 3, reps: null, duration: 40, rest: 60, category: 'Lower Body', instruction: 'Back flat on wall, hold at 90°. Breathe slowly.', emoji: '🧱' },
          { id: 'i_018', name: 'Glute Bridge', sets: 3, reps: 15, rest: 45, category: 'Lower Body', instruction: 'Lie back, feet flat. Drive hips up, squeeze glutes at top.', emoji: '🍑' },
          { id: 'i_019', name: 'Lateral Band Walk (or shuffle)', sets: 3, reps: 15, rest: 30, category: 'Lower Body', instruction: 'Step sideways 15 steps each direction. Stay low.', emoji: '🦀' },
        ],
        cooldown: 'Pigeon pose + standing quad stretch | 5 min',
        totalTime: 45, calories: 300,
      },
      friday: {
        focus: 'Yoga Flow + Strength', icon: '🧘',
        warmup: [
          { name: 'Sun Salutation A (3 rounds)', duration: 180, sets: 1, rest: 0, instruction: 'Flow through mountain, fold, plank, up-dog, down-dog. Breathe.' },
        ],
        exercises: [
          { id: 'i_020', name: 'Warrior II (both sides)', sets: 3, reps: null, duration: 30, rest: 30, category: 'Yoga', instruction: 'Wide stance, front knee bent, arms parallel to floor. Gaze forward.', emoji: '⚔️' },
          { id: 'i_021', name: 'Chair Pose (deep hold)', sets: 3, reps: null, duration: 30, rest: 30, category: 'Yoga', instruction: 'Thighs parallel to floor. Arms overhead. Breathe deeply.', emoji: '🪑' },
          { id: 'i_022', name: 'Boat Pose (Navasana)', sets: 3, reps: null, duration: 20, rest: 30, category: 'Yoga', instruction: 'Balance on tailbone, legs and torso form V. Arms forward.', emoji: '⛵' },
          { id: 'i_023', name: 'Bridge Pose (Setu Bandha)', sets: 3, reps: null, duration: 30, rest: 30, category: 'Yoga', instruction: 'Feet flat, hips rise. Clasp hands under back.', emoji: '🌉' },
          { id: 'i_024', name: 'Savasana', sets: 1, reps: null, duration: 300, rest: 0, category: 'Yoga', instruction: 'Full relaxation. Scan body from toes to head. 5 minutes.', emoji: '😴' },
        ],
        cooldown: 'Included in session',
        totalTime: 45, calories: 160,
      },
    },
    weekend: {
      saturday: { focus: 'Active Rest — 45 min walk or cycling', icon: '🚴', calories: 220 },
      sunday: { focus: 'Rest & Recovery — yoga or light stretching', icon: '😌', calories: 80 },
    },
  },
  advanced: {
    label: 'Advanced (Weeks 9+)',
    description: 'Progressive overload — compound moves, HIIT, endurance',
    days: {
      monday: {
        focus: 'Strength & Power', icon: '🔥',
        warmup: [
          { name: 'Dynamic Warmup Circuit', duration: 120, sets: 2, rest: 30, instruction: 'Jumping jacks → high knees → arm circles → hip openers' },
        ],
        exercises: [
          { id: 'a_001', name: 'Full Push-ups (wide grip)', sets: 4, reps: 15, rest: 45, category: 'Upper Body', instruction: 'Wide hands, deep chest touch. Explode up.', emoji: '🏋️' },
          { id: 'a_002', name: 'Jump Squats (or fast squats)', sets: 4, reps: 15, rest: 45, category: 'Lower Body', instruction: 'Squat deep, explode upward. Land soft. Fast tempo.', emoji: '🦵' },
          { id: 'a_003', name: 'Plank with Shoulder Taps', sets: 3, reps: 20, rest: 30, category: 'Core', instruction: 'In plank, tap opposite shoulder. Hips stay still.', emoji: '🧱' },
          { id: 'a_004', name: 'Bulgarian Split Squat', sets: 3, reps: 12, rest: 60, category: 'Lower Body', instruction: 'Rear foot on chair, front foot forward. Lunge deep.', emoji: '🦵' },
          { id: 'a_005', name: 'Diamond Push-ups', sets: 3, reps: 10, rest: 60, category: 'Upper Body', instruction: 'Hands form diamond below chest. Slow down, fast up.', emoji: '💎' },
          { id: 'a_006', name: 'V-ups', sets: 3, reps: 12, rest: 45, category: 'Core', instruction: 'Lie flat, lift legs and torso simultaneously. Touch toes at top.', emoji: '✌️' },
        ],
        cooldown: 'Deep stretch — 8 min full body',
        totalTime: 45, calories: 380,
      },
      tuesday: {
        focus: 'HIIT Cardio', icon: '⚡',
        warmup: [
          { name: 'Jog in place + Butt kicks', duration: 90, sets: 2, rest: 20, instruction: 'Alternate 30s jog, 30s butt kicks' },
        ],
        exercises: [
          { id: 'a_007', name: 'HIIT: Burpees', sets: 4, reps: 10, rest: 60, category: 'Cardio', instruction: 'Squat, jump back to plank, push-up, jump forward, jump up.', emoji: '💥' },
          { id: 'a_008', name: 'HIIT: Mountain Climbers', sets: 4, reps: null, duration: 30, rest: 30, category: 'Cardio', instruction: 'Plank position, drive knees to chest alternately. Fast.', emoji: '🧗' },
          { id: 'a_009', name: 'HIIT: Jump Rope (or skip)', sets: 4, reps: null, duration: 60, rest: 30, category: 'Cardio', instruction: '1 minute fast skipping. No rope? Mime the motion.', emoji: '🪢' },
          { id: 'a_010', name: 'Brisk Walk / Run cooldown', sets: 1, reps: null, duration: 600, rest: 0, category: 'Cardio', instruction: '10 minute easy walk to bring heart rate down.', emoji: '🚶' },
        ],
        cooldown: 'Breathing + hamstring stretch | 5 min',
        totalTime: 45, calories: 420,
      },
      wednesday: {
        focus: 'Upper Body Hypertrophy', icon: '💪',
        warmup: [
          { name: 'Band / Towel Warmup', duration: 90, sets: 2, rest: 20, instruction: 'Pull-aparts, overhead reach, chest opener' },
        ],
        exercises: [
          { id: 'a_011', name: 'Decline Push-ups (feet elevated)', sets: 4, reps: 12, rest: 60, category: 'Upper Body', instruction: 'Feet on chair. Angle hits upper chest and shoulders.', emoji: '🏋️' },
          { id: 'a_012', name: 'Pike Push-ups', sets: 3, reps: 10, rest: 60, category: 'Upper Body', instruction: 'Inverted V position, lower head to floor. Shoulder focus.', emoji: '🔽' },
          { id: 'a_013', name: 'Inverted Row (under table)', sets: 3, reps: 12, rest: 45, category: 'Upper Body', instruction: 'Lie under table, grip edge, pull chest up. Straight body.', emoji: '🏋️' },
          { id: 'a_014', name: 'Tricep Push-ups (narrow)', sets: 3, reps: 12, rest: 45, category: 'Upper Body', instruction: 'Elbows graze sides. Isolates triceps.', emoji: '💪' },
          { id: 'a_015', name: 'Plank Reach (alternating)', sets: 3, reps: 16, rest: 30, category: 'Core', instruction: 'From plank, reach one arm forward. Control. Alternate.', emoji: '🧱' },
        ],
        cooldown: 'Chest / shoulder deep stretch | 5 min',
        totalTime: 45, calories: 280,
      },
      thursday: {
        focus: 'Legs & Endurance', icon: '🏃',
        warmup: [
          { name: 'Leg Swing Circuit', duration: 90, sets: 2, rest: 20, instruction: 'Forward swings → lateral swings → hip circles' },
        ],
        exercises: [
          { id: 'a_016', name: 'Pistol Squat (assisted)', sets: 3, reps: 8, rest: 60, category: 'Lower Body', instruction: 'Hold wall for balance. Single-leg squat as deep as possible.', emoji: '🔫' },
          { id: 'a_017', name: 'Jump Lunges (or fast lunges)', sets: 4, reps: 12, rest: 45, category: 'Lower Body', instruction: 'Lunge and switch legs in the air. Land soft.', emoji: '🦵' },
          { id: 'a_018', name: 'Glute Bridge with March', sets: 3, reps: 16, rest: 45, category: 'Lower Body', instruction: 'Bridge position, alternate lifting each knee. Hips level.', emoji: '🍑' },
          { id: 'a_019', name: 'Calf Raise (single leg)', sets: 3, reps: 20, rest: 30, category: 'Lower Body', instruction: 'Hold wall, rise on one foot. Full range. Switch.', emoji: '🦶' },
          { id: 'a_020', name: 'Run / Walk interval 20 min', sets: 1, reps: null, duration: 1200, rest: 0, category: 'Cardio', instruction: '1 min run, 2 min walk. Repeat. Push pace each week.', emoji: '🏃' },
        ],
        cooldown: 'Hip flexor + quad deep stretch | 5 min',
        totalTime: 45, calories: 400,
      },
      friday: {
        focus: 'Power Yoga + Mobility', icon: '🧘',
        warmup: [
          { name: 'Sun Salutation B (5 rounds)', duration: 300, sets: 1, rest: 0, instruction: 'Full flow. Build heat. Sync breath and movement.' },
        ],
        exercises: [
          { id: 'a_021', name: 'Crow Pose (attempt)', sets: 3, reps: null, duration: 20, rest: 30, category: 'Yoga', instruction: 'Hands flat, knees on upper arms. Lean forward, lift feet slowly.', emoji: '🦅' },
          { id: 'a_022', name: 'Twisted Chair Pose', sets: 3, reps: null, duration: 30, rest: 30, category: 'Yoga', instruction: 'Chair pose, twist torso, elbow outside knee. Hold and breathe.', emoji: '🌀' },
          { id: 'a_023', name: 'Warrior III (balance)', sets: 3, reps: null, duration: 20, rest: 30, category: 'Yoga', instruction: 'Stand on one leg, torso and other leg parallel to floor. Arms forward.', emoji: '⚔️' },
          { id: 'a_024', name: 'Wheel Pose (or bridge)', sets: 3, reps: null, duration: 20, rest: 30, category: 'Yoga', instruction: 'Full backbend if able, else deep bridge. Open chest.', emoji: '🌈' },
          { id: 'a_025', name: 'Savasana', sets: 1, reps: null, duration: 300, rest: 0, category: 'Yoga', instruction: 'Full rest. Scan and release every muscle.', emoji: '😴' },
        ],
        cooldown: 'Included in session',
        totalTime: 45, calories: 200,
      },
    },
    weekend: {
      saturday: { focus: 'Active Rest — 60 min walk, swim, or cycling', icon: '🚴', calories: 300 },
      sunday: { focus: 'Rest & Recovery — foam rolling & deep stretch', icon: '😌', calories: 100 },
    },
  },
};

export const WorkoutLevels = [
  { key: 'beginner',     label: 'Beginner',     description: 'Weeks 1–4 | Low impact, habit building',   weeks: '1-4',  phaseEmoji: '🌱' },
  { key: 'intermediate', label: 'Intermediate', description: 'Weeks 5–8 | Moderate intensity, more reps', weeks: '5-8',  phaseEmoji: '💪' },
  { key: 'advanced',     label: 'Advanced',     description: 'Weeks 9+ | Compound moves & HIIT',          weeks: '9+',   phaseEmoji: '🔥' },
];

export const WorkoutDayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export default WorkoutPlans;
