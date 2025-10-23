/**
 * Filter Studio Screen - Core filter application screen
 */

import React, {useState, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import {Colors, Typography, Spacing, BorderRadius, Shadows} from '@constants';
import {SpectraBadge, useToast} from '@components';
import {useAppStore, useFilterStore} from '@store';
import {useHaptics} from '@hooks/useHaptics';
import {ImageSaveService} from '@services/ImageSaveService';
import FilteredImage from '@skia/FilteredImage';
import type {FilterStudioScreenProps} from '@navigation/types';
import type {Filter} from '@types';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const FilterStudioScreen: React.FC<FilterStudioScreenProps> = ({
  navigation,
  route,
}) => {
  const {imageUri} = route.params || {};
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {showToast} = useToast();
  const haptics = useHaptics();

  const currentImage = useAppStore(state => state.currentImage);
  const isPremium = useAppStore(state => state.isPremium);
  const savePhoto = useAppStore(state => state.savePhoto);
  const imageQuality = useAppStore(state => state.preferences.imageQuality);

  const filters = useFilterStore(state => state.filters);
  const incrementUsage = useFilterStore(state => state.incrementUsage);

  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [showingOriginal, setShowingOriginal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Zoom/pan state
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const displayImageUri = imageUri || currentImage?.uri || '';

  // Gestures
  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = Math.max(1, Math.min(3, e.scale));
    })
    .onEnd(() => {
      if (scale.value < 1.1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (scale.value > 1) {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      }
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
  }));

  const handleFilterSelect = useCallback(
    (filter: Filter) => {
      if (filter.isPremium && !isPremium) {
        haptics.notification('warning');
        navigation.navigate('PremiumUnlock');
        return;
      }

      haptics.light();
      setSelectedFilter(filter);
      incrementUsage(filter.id);
    },
    [isPremium, haptics, navigation, incrementUsage],
  );

  const handleCompare = useCallback(() => {
    haptics.medium();
    setShowingOriginal(prev => !prev);
  }, [haptics]);

  const handleSave = useCallback(async () => {
    if (!displayImageUri || !selectedFilter) {
      showToast({
        message: 'Please select a filter first',
        type: 'warning',
      });
      return;
    }

    try {
      setSaving(true);
      haptics.medium();

      const savedPhoto = await ImageSaveService.saveImage(
        displayImageUri,
        selectedFilter.id,
        selectedFilter.name,
        {quality: imageQuality, saveToLibrary: true},
      );

      savePhoto(savedPhoto);

      haptics.notification('success');
      showToast({
        message: 'Photo saved successfully!',
        type: 'success',
        icon: 'check-circle',
      });
    } catch (error) {
      console.error('Save error:', error);
      haptics.notification('error');
      showToast({
        message: 'Failed to save photo. Please try again.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  }, [displayImageUri, selectedFilter, imageQuality, savePhoto, showToast, haptics]);

  const handleBack = useCallback(() => {
    haptics.light();
    navigation.goBack();
  }, [navigation, haptics]);

  const renderFilterItem = ({item: filter}: {item: Filter}) => {
    const isSelected = selectedFilter?.id === filter.id;
    const isLocked = filter.isPremium && !isPremium;

    return (
      <TouchableOpacity
        onPress={() => handleFilterSelect(filter)}
        style={[styles.filterItem, isSelected && styles.filterItemSelected]}>
        <View style={styles.filterThumbnail}>
          {isLocked && (
            <View style={styles.filterLocked}>
              <Icon name="lock" size={20} color={Colors.white} />
            </View>
          )}
          <FilteredImage
            imageUri={displayImageUri}
            filterId={filter.id}
            width={100}
            height={100}
          />
        </View>
        <Text
          style={[styles.filterName, isSelected && styles.filterNameSelected]}
          numberOfLines={1}>
          {filter.name}
        </Text>
        {filter.isPremium && !isPremium && (
          <SpectraBadge variant="premium" size="sm" style={styles.filterBadge}>
            PRO
          </SpectraBadge>
        )}
      </TouchableOpacity>
    );
  };

  if (!displayImageUri) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No image selected</Text>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.errorButton}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Image Canvas */}
      <View style={styles.canvasContainer}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.canvas, animatedStyle]}>
            <FilteredImage
              imageUri={displayImageUri}
              filterId={showingOriginal ? null : selectedFilter?.id || null}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT * 0.6}
            />
          </Animated.View>
        </GestureDetector>

        {/* Top Actions */}
        <SafeAreaView style={styles.topActions} edges={['top']}>
          <TouchableOpacity onPress={handleBack} style={styles.actionButton}>
            <Icon name="chevron-left" size={24} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.actionButton}>
            <Icon name="more-horizontal" size={24} color={Colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Floating Actions */}
        <View style={styles.floatingActions}>
          <TouchableOpacity
            onPress={handleCompare}
            style={[styles.floatingButton, styles.compareButton]}>
            <Icon
              name={showingOriginal ? 'eye-off' : 'eye'}
              size={24}
              color={Colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSave}
            style={[styles.floatingButton, styles.saveButton]}
            disabled={saving}>
            {saving ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Icon name="download" size={24} color={Colors.white} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet with Filters */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[280, 500, '90%']}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandle}>
        <View style={styles.bottomSheetContent}>
          {/* Filter Gallery */}
          <FlatList
            data={filters}
            renderItem={renderFilterItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          />

          {/* Active Filter Info */}
          {selectedFilter && (
            <View style={styles.filterInfo}>
              <Text style={styles.filterInfoName}>{selectedFilter.name}</Text>
              <Text style={styles.filterInfoCategory}>
                {selectedFilter.category.toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  canvasContainer: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  topActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingActions: {
    position: 'absolute',
    bottom: 300,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.shadow2,
  },
  compareButton: {
    backgroundColor: 'rgba(45, 45, 45, 0.9)',
  },
  saveButton: {
    backgroundColor: Colors.brandPurple,
  },
  bottomSheetBackground: {
    backgroundColor: Colors.surface,
  },
  bottomSheetHandle: {
    backgroundColor: Colors.border,
  },
  bottomSheetContent: {
    flex: 1,
    padding: Spacing.md,
  },
  filterList: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  filterItem: {
    alignItems: 'center',
    width: 100,
  },
  filterItemSelected: {
    transform: [{scale: 1.05}],
  },
  filterThumbnail: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: Spacing.xs,
  },
  filterLocked: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  filterName: {
    ...Typography.styles.caption,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  filterNameSelected: {
    color: Colors.brandPurple,
    fontWeight: Typography.fontWeight.semibold,
  },
  filterBadge: {
    marginTop: Spacing.xs,
  },
  filterInfo: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  filterInfoName: {
    ...Typography.styles.h3,
    color: Colors.textPrimary,
  },
  filterInfoCategory: {
    ...Typography.styles.label,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...Typography.styles.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  errorButton: {
    ...Typography.styles.body,
    color: Colors.brandPurple,
  },
});

export default FilterStudioScreen;
