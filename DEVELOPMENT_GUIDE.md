# Spectra Development Guide

## 🎉 Current Status

The **foundation** of the Spectra app has been successfully implemented! This includes:

- ✅ Complete project structure
- ✅ Design system (colors, typography, spacing, shadows)
- ✅ Core reusable components
- ✅ State management (Zustand stores)
- ✅ All 100 filter definitions
- ✅ Filter engine with color matrices
- ✅ TypeScript types
- ✅ iOS configuration
- ✅ Comprehensive documentation

## 📋 Next Steps to Complete the App

### Phase 1: Setup & Dependencies (1-2 hours)

1. **Install Node Modules**
```bash
npm install
```

2. **Install iOS Dependencies**
```bash
cd ios
pod install
cd ..
```

3. **Verify Build**
```bash
npm run ios
```

Expected result: App launches showing "SPECTRA" logo with "App Foundation Ready" message.

---

### Phase 2: Navigation Setup (2-3 hours)

**Goal**: Implement React Navigation with gesture-enabled stack navigator.

**Files to Create**:

1. `src/navigation/RootNavigator.tsx`
   - Stack navigator configuration
   - Screen definitions (Splash, Home, FilterStudio, Library, Settings, PremiumUnlock)
   - Gesture configurations
   - Screen transition animations

2. `src/navigation/types.ts`
   - Navigation prop types
   - Route param types

**Tasks**:
- [ ] Create stack navigator with custom transitions
- [ ] Configure gesture navigation
- [ ] Add modal presentation for Premium Unlock
- [ ] Test navigation between screens
- [ ] Update App.tsx to use navigator

**References**:
- React Navigation docs: https://reactnavigation.org/
- Design doc: Section 5 (Navigation Structure)

---

### Phase 3: Home Screen Implementation (4-6 hours)

**Goal**: Build the main hub screen with all interactive elements.

**File**: `src/screens/HomeScreen.tsx`

**Components to Implement**:
- [ ] App bar with logo and premium/settings icons
- [ ] Hero image card (last edited photo or gradient placeholder)
- [ ] Headline text with context awareness
- [ ] Primary CTA button ("Choose Photo")
- [ ] Secondary button ("Browse Library")
- [ ] Recent edits horizontal scroll
- [ ] Quick access cards (Filter Packs, Settings)

**Animations to Add**:
- [ ] Staggered entry animations (use Reanimated)
- [ ] Hero card gradient animation (continuous)
- [ ] Button press scale animations
- [ ] Pull-to-refresh

**Gestures**:
- [ ] Swipe up → Navigate to Filter Studio
- [ ] Swipe right → Navigate to Library
- [ ] Long press hero card → Context menu

**References**:
- Design doc: Section 6.1 (Home Screen)

---

### Phase 4: Filter Studio Screen (8-12 hours)

**Goal**: Core editing screen with filter application and gestures.

**File**: `src/screens/FilterStudioScreen.tsx`

**Major Components**:

1. **Image Canvas** (with Skia)
   - [ ] Full-screen image display
   - [ ] Pinch-to-zoom (1x - 3x)
   - [ ] Pan when zoomed
   - [ ] Double-tap zoom toggle
   - [ ] Apply filter using Skia ColorMatrix

2. **Bottom Sheet** (using @gorhom/bottom-sheet)
   - [ ] Draggable sheet with 3 snap points
   - [ ] Filter thumbnail gallery (horizontal scroll)
   - [ ] Active filter info display
   - [ ] Expanded mode with categories

3. **Floating Action Buttons**
   - [ ] Compare button (toggle original/filtered)
   - [ ] Save button (open save options)

**Filter Application**:
- [ ] Create Skia canvas component
- [ ] Apply color matrix from filterEngine
- [ ] Real-time preview (debounced)
- [ ] Full-resolution processing on save

**Gestures**:
- [ ] Swipe left/right on image → Previous/next filter
- [ ] Swipe down from top → Exit studio
- [ ] Two-finger swipe → Before/after split view
- [ ] Long press canvas → Show original

**Files to Create**:
- `src/skia/FilteredImage.tsx` - Skia component for filtered image
- `src/components/BottomSheet.tsx` - Custom bottom sheet wrapper
- `src/components/FilterThumbnail.tsx` - Filter preview thumbnail
- `src/services/ImageService.ts` - Image loading/saving utilities

**References**:
- Design doc: Section 6.2 (Filter Studio Screen)
- Skia docs: https://shopify.github.io/react-native-skia/

---

### Phase 5: Image Picker & Permissions (2-3 hours)

**Goal**: Integrate native image picker with permission handling.

**File**: `src/services/ImagePickerService.ts`

**Tasks**:
- [ ] Implement `pickImage()` function
- [ ] Request photo library permission
- [ ] Handle permission denial gracefully
- [ ] Show permission explanation screen if denied
- [ ] Return ImageData object

**Files to Create**:
- `src/screens/PermissionExplanationScreen.tsx`
- `src/hooks/useImagePicker.ts` - Custom hook for picking images
- `src/hooks/usePermissions.ts` - Permission state hook

**References**:
- react-native-image-picker docs
- Design doc: Section 11 (Permissions & Privacy)

---

### Phase 6: Image Save Functionality (3-4 hours)

**Goal**: Save filtered images to device with quality options.

**File**: `src/services/ImageSaveService.ts`

**Tasks**:
- [ ] Implement `saveImage()` function
- [ ] Apply filter at full resolution
- [ ] Respect quality settings (high/medium/low)
- [ ] Save to photo library
- [ ] Add to savedPhotos in app store
- [ ] Show success toast

**Components to Create**:
- `src/components/SaveOptionsSheet.tsx` - Bottom sheet with save options

**Features**:
- [ ] Quality selector (High/Medium/Low)
- [ ] Format selector (JPEG/PNG/HEIC)
- [ ] Save to Photos toggle
- [ ] Share option

**References**:
- Design doc: Section 6.2.2 (Save Options Sheet)

---

### Phase 7: Library Screen (4-6 hours)

**Goal**: Grid view of saved photos with preview modal.

**File**: `src/screens/LibraryScreen.tsx`

**Components**:
- [ ] Header with title and menu
- [ ] Photo grid (FlatList with 3 columns)
- [ ] Photo preview modal (full-screen)
- [ ] Multi-select mode
- [ ] Action bar (for selected photos)
- [ ] Empty state

**Photo Grid Features**:
- [ ] Lazy loading thumbnails
- [ ] Filter badge indicator
- [ ] Selection checkboxes (multi-select mode)
- [ ] Tap → Open preview
- [ ] Long press → Enter multi-select

**Preview Modal**:
- [ ] Full-screen zoomable image
- [ ] Metadata display (filename, filter, date)
- [ ] Share button
- [ ] Edit Again button
- [ ] Delete option

**Gestures**:
- [ ] Swipe left → Back to Home
- [ ] Swipe down on preview → Dismiss
- [ ] Pinch on grid → Change column count

**References**:
- Design doc: Section 6.3 (Library Screen)

---

### Phase 8: Settings Screen (2-3 hours)

**Goal**: Preferences and app configuration screen.

**File**: `src/screens/SettingsScreen.tsx`

**Sections to Implement**:

1. **General**
   - [ ] Image Quality selector
   - [ ] Auto-Save toggle
   - [ ] Haptic Feedback toggle

2. **Filters & Display**
   - [ ] Show Filter Count toggle
   - [ ] Preview Quality selector
   - [ ] Grid Columns selector

3. **Storage**
   - [ ] Cache Size display
   - [ ] Clear Cache button

4. **About**
   - [ ] Version display
   - [ ] Privacy Policy link
   - [ ] Terms of Service link
   - [ ] Rate Spectra link

**Components to Create**:
- `src/components/SettingsRow.tsx` - Reusable settings row
- `src/components/SettingsSection.tsx` - Section with header

**References**:
- Design doc: Section 6.4 (Settings Screen)

---

### Phase 9: Premium Unlock & IAP (6-8 hours)

**Goal**: Implement in-app purchase flow for premium unlock.

**Files to Create**:

1. `src/screens/PremiumUnlockModal.tsx`
   - Animated crown icon
   - Feature list
   - Purchase button
   - Restore purchases link

2. `src/services/IAPService.ts`
   - Initialize IAP connection
   - Get available products
   - Request purchase
   - Restore purchases
   - Verify receipts

**Tasks**:
- [ ] Configure IAP products in App Store Connect
- [ ] Implement purchase flow
- [ ] Handle success/failure states
- [ ] Store purchase status in app store
- [ ] Lock/unlock filters based on premium status
- [ ] Add "PRO" badges to premium filters

**Components**:
- [ ] Crown icon animation (Lottie or Skia)
- [ ] Confetti animation on success (Skia particles)

**IAP Products to Configure**:
- `com.spectra.premium.full` - $9.99
- `com.spectra.pack.vintage` - $2.99
- `com.spectra.pack.artistic` - $2.99
- `com.spectra.pack.professional` - $2.99

**References**:
- Design doc: Section 6.5 (Premium Unlock Modal)
- Design doc: Section 10 (IAP Implementation)
- react-native-iap docs

---

### Phase 10: Splash Screen Animation (4-6 hours)

**Goal**: Create stunning particle-based logo animation.

**File**: `src/screens/SplashScreen.tsx` (replace existing)

**Animation Sequence**:
1. Particle formation (500+ particles)
2. Letter formation (S-P-E-C-T-R-A)
3. Solidification (particles merge)
4. Reveal (scale + tagline fade in)
5. Transition to main screen

**Implementation with Skia**:
- [ ] Particle system (500 particles)
- [ ] Physics simulation (gravity, friction)
- [ ] Letter path definitions
- [ ] Magnetic attraction to targets
- [ ] Blur effect reduction
- [ ] Background gradient animation

**Duration**: ~2.5 seconds total

**References**:
- Design doc: Section 4 (Splash Screen)
- Skia animation docs

---

### Phase 11: Animations & Polish (6-8 hours)

**Goal**: Add all micro-interactions and animations throughout the app.

**Tasks**:

1. **Screen Transitions**
   - [ ] Custom transition animations
   - [ ] Parallax effects
   - [ ] Shared element transitions

2. **Component Animations**
   - [ ] Button press animations (scale + ripple)
   - [ ] Card entry animations (staggered)
   - [ ] Toast animations (slide + fade)
   - [ ] Modal presentation animations

3. **Gesture Feedback**
   - [ ] Haptic feedback on all interactions
   - [ ] Visual feedback (scale, opacity changes)
   - [ ] Rubber band effects on bounds

4. **Loading States**
   - [ ] Skeleton loaders
   - [ ] Progress indicators
   - [ ] Optimistic UI updates

**Files to Create**:
- `src/animations/transitions.ts` - Reusable transition configs
- `src/animations/springs.ts` - Spring animation presets
- `src/hooks/useHaptics.ts` - Haptic feedback hook

**References**:
- Design doc: Section 6 (Screen Specifications - Animations sections)
- Reanimated docs: https://docs.swmansion.com/react-native-reanimated/

---

### Phase 12: Performance Optimization (4-6 hours)

**Goal**: Ensure smooth 60fps performance throughout the app.

**Tasks**:

1. **Image Optimization**
   - [ ] Implement image caching with MMKV
   - [ ] Downsampled previews (1024px max)
   - [ ] Lazy loading in grids
   - [ ] Bitmap recycling

2. **Filter Optimization**
   - [ ] Debounce filter changes (100ms)
   - [ ] Cache filter previews
   - [ ] LRU cache eviction (50 items max)
   - [ ] Progressive rendering

3. **Memory Management**
   - [ ] Monitor memory usage
   - [ ] Clear cache on low memory warning
   - [ ] Unload off-screen images

4. **Animation Performance**
   - [ ] Run animations on UI thread
   - [ ] Avoid JS bridge during gestures
   - [ ] Use `useAnimatedStyle` for all animations

**Files to Create**:
- `src/services/CacheService.ts` - MMKV-based cache manager
- `src/utils/performance.ts` - Performance utilities

**References**:
- Design doc: Section 12 (Performance Optimization)

---

### Phase 13: Error Handling & Edge Cases (3-4 hours)

**Goal**: Handle all error scenarios gracefully.

**Scenarios to Handle**:

1. **Image Loading Errors**
   - [ ] Corrupted files
   - [ ] Unsupported formats
   - [ ] Insufficient memory

2. **Filter Application Errors**
   - [ ] Out of memory
   - [ ] Processing timeout (10s)

3. **IAP Errors**
   - [ ] Network failures
   - [ ] User cancellation
   - [ ] Payment issues

4. **Permission Errors**
   - [ ] Denied photo access
   - [ ] Restricted access

**Components**:
- [ ] Error boundary component
- [ ] Retry mechanisms
- [ ] User-friendly error messages

**References**:
- Design doc: Section 13 (Error Handling)

---

### Phase 14: Testing (6-8 hours)

**Goal**: Ensure app quality and stability.

**Types of Tests**:

1. **Unit Tests**
   - [ ] Filter color matrix calculations
   - [ ] State management logic
   - [ ] Utility functions

2. **Integration Tests**
   - [ ] Filter application workflow
   - [ ] IAP purchase flow
   - [ ] Image save process

3. **E2E Tests** (Optional with Detox)
   - [ ] First-time user flow
   - [ ] Apply filter and save
   - [ ] Purchase premium

4. **Manual Testing**
   - [ ] Test on iPhone SE (small screen)
   - [ ] Test on iPhone 15 Pro Max (large screen)
   - [ ] Test on iPad
   - [ ] Test all gestures
   - [ ] Test with 100+ saved photos

**References**:
- Design doc: Section 14.5 (Manual Testing Checklist)

---

### Phase 15: Final Polish & Release Prep (4-6 hours)

**Goal**: Prepare app for App Store submission.

**Tasks**:

1. **App Store Assets**
   - [ ] Design app icon (1024x1024)
   - [ ] Create screenshots for all device sizes
   - [ ] Record promotional video (30s)
   - [ ] Write App Store description

2. **Configuration**
   - [ ] Set bundle identifier
   - [ ] Configure signing certificates
   - [ ] Set version number (1.0.0)
   - [ ] Configure build settings

3. **Final Testing**
   - [ ] Build release version
   - [ ] Test on physical devices
   - [ ] Verify IAP in sandbox
   - [ ] Check all permissions
   - [ ] Test app size (< 15MB target)

4. **Documentation**
   - [ ] Update README
   - [ ] Add changelog
   - [ ] Document known issues

**References**:
- Design doc: Section 15 (Build & Deployment)

---

## 🛠️ Development Tips

### Hot Reload Issues?
```bash
# Clear Metro cache
npm start -- --reset-cache
```

### TypeScript Errors?
```bash
# Rebuild TypeScript
npx tsc --noEmit
```

### iOS Build Fails?
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Path Alias Not Working?
- Check `babel.config.js` for module-resolver plugin
- Check `tsconfig.json` for paths configuration
- Restart Metro bundler

---

## 📚 Key Resources

- **Design Document**: See original design document for complete specifications
- **React Native**: https://reactnative.dev/
- **Reanimated**: https://docs.swmansion.com/react-native-reanimated/
- **Skia**: https://shopify.github.io/react-native-skia/
- **Zustand**: https://docs.pmnd.rs/zustand/getting-started/introduction
- **React Navigation**: https://reactnavigation.org/

---

## 📊 Progress Tracking

Use the todo list to track your progress:
- ✅ = Completed
- 🚧 = In Progress
- ⏳ = Pending

---

## 🎯 Estimated Total Time to Completion

- **Minimum** (experienced developer): 50-60 hours
- **Average**: 70-90 hours
- **Including testing & polish**: 100-120 hours

Split across sprints:
- **Sprint 1** (Phases 1-6): Core functionality
- **Sprint 2** (Phases 7-9): Screens & IAP
- **Sprint 3** (Phases 10-15): Polish & release

---

## 🚀 Ready to Continue?

Start with **Phase 1** to install dependencies and verify the build works!

```bash
npm install
cd ios && pod install && cd ..
npm run ios
```

Good luck building Spectra! 🎨✨
