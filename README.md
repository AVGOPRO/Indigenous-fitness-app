# Nalam - the Wellness 🌺

Nalam is a comprehensive, culturally-tailored wellness and fitness application designed specifically with a South Indian aesthetic and approach to health. It focuses on sustainable weight loss, progressive fitness, and mindfulness, moving away from quick fixes and supplements.

## 🌟 Key Features

- **Progressive Workout System:** 
  - Adaptive 3-tier workout plans (Beginner, Intermediate, Advanced) that automatically scale in difficulty over time.
  - Consistent 45-minute structured daily routines including warm-up, core exercises, and cooldown.
  - Active rest day and full rest day integrations.
- **Smart Health Tracking & Estimations:**
  - Calculates TDEE and safe Caloric Deficits using the Mifflin-St Jeor equation.
  - Realistic, tiered weight loss pace estimations (0.5 kg/week to 1.0 kg/week based on training phase).
  - Hydration tracking and goal setting.
- **Rich User Experience:**
  - "Teal and Gold" premium aesthetic with Rangoli-inspired particle system touches.
  - Dynamic UI that celebrates milestones and provides phase-specific motivational messaging.
  - Read-only weekly plan previews and live active workout timers.
- **Holistic Wellness:**
  - Integrated meditation audio infrastructure.
  - Localized meal plans and food databases tailored for South Indian cuisine.

## 🛠 Tech Stack

- **Framework:** React Native with [Expo](https://expo.dev/) (SDK 55)
- **State Management:** Zustand
- **Navigation:** React Navigation (Bottom Tabs & Native Stack)
- **Local Storage:** Expo Secure Store & Expo SQLite
- **Styling:** Vanilla StyleSheet with custom design tokens (Colors, Spacing, Typography)
- **Build System:** EAS (Expo Application Services)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nalam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

## 📦 Building the App

This project is configured for EAS Build. 

### Preview Build (APK for direct Android installation)
```bash
eas build --platform android --profile preview
```

### Production Build (AAB for Google Play Store)
```bash
eas build --platform android --profile production
```

## 📂 Project Structure

```text
src/
├── components/   # Reusable UI components (Timers, Cards, Headers)
├── data/         # Static data (Workout Plans, Meal Plans, Meditation Sessions)
├── navigation/   # Tab and Stack navigators
├── screens/      # Main application screens (Home, Workout, Onboarding, Progress, Diet)
├── services/     # Core business logic (HealthService, StorageService, NotificationService)
├── store/        # Zustand state stores (userStore, workoutStore, dietStore, progressStore)
├── theme/        # Design system tokens (colors.js, typography.js, spacing.js)
└── utils/        # Helper functions and formatters
```

## 🤝 Contributing

When contributing to this repository, please ensure that all aesthetic changes adhere to the "Teal and Gold" design language and respect the established component structure. All new workout or diet plans should be vetted for safety and cultural relevance.

---
*Built with ❤️ for a healthier tomorrow.*
