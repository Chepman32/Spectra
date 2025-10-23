# Spectra - Premium Photo Filtering App

![Status](https://img.shields.io/badge/status-in_development-yellow)
![Platform](https://img.shields.io/badge/platform-iOS-lightgrey)
![React Native](https://img.shields.io/badge/React%20Native-0.74+-blue)

A premium iOS photo filtering application delivering 100 unique, professionally-crafted filters in a gesture-driven, fluid interface.

## 📱 Overview

Spectra is a filter-first image editor that eliminates complexity by focusing exclusively on transforming photos with stunning filters. No cropping, no drawing tools, no stickers—just pure, powerful filtering delivered through an intuitive gesture-based interface.

### Key Features (Planned)

- ✨ 100 unique, professionally-crafted filters
- 🎨 Gesture-driven, fluid interface
- 🚀 GPU-accelerated rendering with React Native Skia
- 📴 Works completely offline
- 💎 Premium unlock via one-time IAP ($9.99)
- 🎭 20 free filters, 80 premium filters
- 📦 Filter packs available ($2.99 each)

## 🏗️ Architecture

### Technology Stack

- **Framework**: React Native 0.74+
- **Animation**: React Native Reanimated 3.x
- **Graphics**: React Native Skia
- **State Management**: Zustand
- **Navigation**: React Navigation 6.x
- **IAP**: react-native-iap
- **Storage**: AsyncStorage, MMKV
- **Icons**: react-native-vector-icons

### Project Structure

```
Spectra/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── SpectraButton.tsx
│   │   ├── SpectraCard.tsx
│   │   ├── SpectraBadge.tsx
│   │   └── Toast/           # Toast notification system
│   │
│   ├── screens/             # Screen components
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx (TODO)
│   │   ├── FilterStudioScreen.tsx (TODO)
│   │   ├── LibraryScreen.tsx (TODO)
│   │   └── SettingsScreen.tsx (TODO)
│   │
│   ├── filters/             # Filter engine and definitions
│   │   ├── definitions/
│   │   │   └── filterDefinitions.ts  # All 100 filters
│   │   ├── implementations/
│   │   │   └── colorMatrices.ts      # Color matrix utilities
│   │   └── filterEngine.ts           # Core filter logic
│   │
│   ├── store/               # State management (Zustand)
│   │   ├── appStore.ts      # App state
│   │   └── filterStore.ts   # Filter state
│   │
│   ├── constants/           # Design system
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── borderRadius.ts
│   │   ├── shadows.ts
│   │   └── dimensions.ts
│   │
│   ├── navigation/          # Navigation setup (TODO)
│   ├── services/            # Services (IAP, image processing) (TODO)
│   ├── hooks/               # Custom React hooks (TODO)
│   ├── utils/               # Utility functions (TODO)
│   ├── animations/          # Reanimated configs (TODO)
│   ├── skia/                # Skia graphics components (TODO)
│   └── types/               # TypeScript definitions
│
├── ios/                     # iOS native code (TODO)
├── App.tsx                  # Main app component
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Xcode 14+ (for iOS development)
- CocoaPods

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Spectra
```

2. **Install dependencies**

```bash
npm install
```

**Note**: The following packages need to be added to package.json:
- `react-native-linear-gradient`
- `babel-plugin-module-resolver`

3. **Install iOS dependencies**

```bash
cd ios
pod install
cd ..
```

4. **Run the app**

```bash
# iOS
npm run ios

# Specific simulator
npm run ios -- --simulator="iPhone 15 Pro"
```

## 📦 Current Implementation Status

### ✅ Completed

- [x] Project structure and configuration
- [x] Design system (colors, typography, spacing, shadows)
- [x] Core reusable components (Button, Card, Badge, Toast)
- [x] State management setup (Zustand stores)
- [x] Filter definitions (all 100 filters with metadata)
- [x] Filter engine foundation (color matrices)
- [x] TypeScript type definitions
- [x] Basic App.tsx structure

### 🚧 In Progress

- [ ] Splash screen with particle animation (Skia)
- [ ] Navigation structure
- [ ] Screen implementations

### 📋 TODO

#### High Priority
- [ ] Implement all screens:
  - [ ] Home Screen with animations
  - [ ] Filter Studio Screen with gesture controls
  - [ ] Library Screen with photo grid
  - [ ] Settings Screen
  - [ ] Premium Unlock Modal

- [ ] Filter application with Skia
- [ ] Image picker integration
- [ ] Image save functionality
- [ ] IAP integration
- [ ] Permission handling (Photo Library)

#### Medium Priority
- [ ] Implement all 100 filter algorithms
- [ ] Add gesture handlers (swipe, pinch, etc.)
- [ ] Implement bottom sheet component
- [ ] Cache management with MMKV
- [ ] Add comprehensive animations
- [ ] Error handling

#### Low Priority
- [ ] iOS Info.plist configuration
- [ ] App icon and splash screen assets
- [ ] Performance optimization
- [ ] Testing
- [ ] Documentation

## 🎨 Design System

The app follows a comprehensive design system based on the specification document:

### Colors

- **Brand Purple**: `#8B5CF6`
- **Background Dark**: `#0F0F0F`
- **Surface**: `#1A1A1A`
- **Text Primary**: `#FFFFFF`
- **Success**: `#10B981`
- **Warning**: `#F59E0B`
- **Error**: `#EF4444`

### Typography

Using iOS system font (SF Pro):
- Display: 34px, Bold
- H1: 28px, Semibold
- H2: 22px, Semibold
- Body: 16px, Regular
- Caption: 12px, Regular

### Spacing

Based on 8px grid:
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px

## 🖼️ Filter Categories

All 100 filters are organized into 10 categories:

1. **Color Enhancement** (1-10) - FREE
2. **Vintage/Retro** (11-20) - PREMIUM
3. **Black & White** (21-30) - FREE
4. **Light Effects** (31-40) - PREMIUM
5. **Blur & Focus** (41-50) - PREMIUM
6. **Artistic Styles** (51-60) - PREMIUM
7. **Temperature** (61-70) - FREE
8. **Grain & Texture** (71-80) - PREMIUM
9. **Color Grading** (81-90) - PREMIUM
10. **Special Effects** (91-100) - PREMIUM

## 🔧 Development

### Adding a New Filter

1. Add filter definition in `src/filters/definitions/filterDefinitions.ts`
2. Implement color matrix or algorithm in `src/filters/implementations/`
3. Add mapping in `src/filters/filterEngine.ts`
4. Test with different images

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## 📱 Screens Overview

### Home Screen
- Hero image card (last edited photo)
- Primary CTA: "Choose Photo"
- Recent edits carousel
- Quick access to filter packs and settings

### Filter Studio
- Full-screen image canvas with zoom/pan
- Horizontal filter gallery (bottom sheet)
- Gesture controls (swipe, pinch, long-press)
- Save and compare buttons

### Library
- Grid layout of saved photos (3 columns)
- Photo preview modal with zoom
- Multi-select mode for batch actions

### Settings
- Image quality preferences
- Auto-save toggle
- Haptic feedback toggle
- Cache management
- About & legal

### Premium Unlock
- Crown icon with animation
- Feature list
- Purchase button ($9.99)
- Restore purchases option

## 🎯 Monetization

- **Free**: 20 basic filters
- **Premium Unlock**: $9.99 one-time purchase for all 100 filters
- **Filter Packs**: $2.99 each
  - Vintage Collection
  - Artistic Collection
  - Professional Collection

## 📄 License

Proprietary - All rights reserved

## 👥 Contributing

This is a proprietary project. For inquiries, please contact the project maintainers.

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Status**: Foundation complete, screens and features in development

**Version**: 1.0.0-alpha

**Last Updated**: October 23, 2025
