/**
 * Home Screen - Main hub of the application
 */

import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  FadeIn,
  FadeInUp,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {SpectraButton, SpectraCard, useToast} from '@components';
import {Colors, Typography, Spacing, BorderRadius, Shadows} from '@constants';
import {useAppStore} from '@store';
import {useImagePicker} from '@hooks/useImagePicker';
import {useHaptics} from '@hooks/useHaptics';
import type {HomeScreenProps} from '@navigation/types';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {pickImage} = useImagePicker();
  const haptics = useHaptics();
  const {showToast} = useToast();

  const isPremium = useAppStore(state => state.isPremium);
  const setCurrentImage = useAppStore(state => state.setCurrentImage);
  const savedPhotos = useAppStore(state => state.savedPhotos);

  const handleChoosePhoto = async () => {
    haptics.medium();
    const image = await pickImage();

    if (image) {
      setCurrentImage(image);
      navigation.navigate('FilterStudio', {imageUri: image.uri});
    }
  };

  const handleBrowseLibrary = () => {
    haptics.light();
    navigation.navigate('Library');
  };

  const handleSettings = () => {
    haptics.light();
    navigation.navigate('Settings');
  };

  const handlePremiumUnlock = () => {
    haptics.medium();
    navigation.navigate('PremiumUnlock');
  };

  const recentEdits = savedPhotos.slice(0, 5);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* App Bar */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.appBar}>
          <Text style={styles.logo}>SPECTRA</Text>
          <View style={styles.appBarIcons}>
            {!isPremium && (
              <TouchableOpacity
                onPress={handlePremiumUnlock}
                style={styles.iconButton}>
                <Icon name="award" size={20} color={Colors.warning} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleSettings} style={styles.iconButton}>
              <Icon name="settings" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Hero Card */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)}>
          {recentEdits.length > 0 ? (
            <SpectraCard
              style={styles.heroCard}
              elevation="lg"
              radius="lg"
              padding="none"
              onPress={() => {
                const lastEdit = recentEdits[0];
                setCurrentImage({
                  uri: lastEdit.uri,
                  width: lastEdit.width,
                  height: lastEdit.height,
                });
                navigation.navigate('FilterStudio', {imageUri: lastEdit.uri});
              }}>
              <Image source={{uri: recentEdits[0].uri}} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroText}>Resume Editing</Text>
              </View>
            </SpectraCard>
          ) : (
            <View style={styles.heroCard}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899', '#F59E0B']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.heroGradient}>
                <Icon name="image" size={64} color="rgba(255,255,255,0.5)" />
              </LinearGradient>
            </View>
          )}
        </Animated.View>

        {/* Headline */}
        <Animated.Text
          entering={FadeInUp.delay(400).duration(400)}
          style={styles.headline}>
          {recentEdits.length > 0 ? 'Welcome Back' : 'Create Something New'}
        </Animated.Text>

        {/* Primary CTA */}
        <Animated.View entering={FadeInUp.delay(600).duration(400)}>
          <SpectraButton
            variant="primary"
            size="lg"
            icon="camera"
            onPress={handleChoosePhoto}
            style={styles.primaryButton}>
            Choose Photo
          </SpectraButton>
        </Animated.View>

        {/* Secondary Button */}
        <Animated.View entering={FadeInUp.delay(700).duration(400)}>
          <SpectraButton
            variant="secondary"
            size="md"
            icon="grid"
            onPress={handleBrowseLibrary}
            style={styles.secondaryButton}>
            Browse Library
          </SpectraButton>
        </Animated.View>

        {/* Recent Edits */}
        {recentEdits.length > 0 && (
          <Animated.View
            entering={FadeInUp.delay(800).duration(500)}
            style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Edits</Text>
              <TouchableOpacity onPress={handleBrowseLibrary}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentScroll}>
              {recentEdits.map((photo, index) => (
                <TouchableOpacity
                  key={photo.id}
                  onPress={() => {
                    setCurrentImage({
                      uri: photo.uri,
                      width: photo.width,
                      height: photo.height,
                    });
                    navigation.navigate('FilterStudio', {imageUri: photo.uri});
                  }}
                  style={styles.recentItem}>
                  <Image source={{uri: photo.uri}} style={styles.recentImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.recentGradient}>
                    <Text style={styles.recentFilterName}>{photo.filterName}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Quick Access */}
        <Animated.View
          entering={FadeInUp.delay(900).duration(500)}
          style={styles.quickAccess}>
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <View style={styles.quickAccessGrid}>
            <SpectraCard
              style={styles.quickAccessCard}
              onPress={() => showToast({message: 'Filter packs coming soon!', type: 'info'})}>
              <Icon name="layers" size={32} color={Colors.brandPurple} />
              <Text style={styles.quickAccessLabel}>Filter Packs</Text>
            </SpectraCard>

            <SpectraCard style={styles.quickAccessCard} onPress={handleSettings}>
              <Icon name="settings" size={32} color={Colors.textSecondary} />
              <Text style={styles.quickAccessLabel}>Settings</Text>
            </SpectraCard>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    fontSize: 20,
    fontWeight: Typography.fontWeight.heavy,
    color: Colors.brandPurple,
    letterSpacing: Typography.letterSpacing.wider,
  },
  appBarIcons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    height: 300,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    ...Typography.styles.h2,
    color: Colors.white,
  },
  headline: {
    ...Typography.styles.h1,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  primaryButton: {
    marginBottom: Spacing.sm,
  },
  secondaryButton: {
    marginBottom: Spacing.xl,
  },
  recentSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.styles.h3,
    color: Colors.textPrimary,
  },
  seeAll: {
    ...Typography.styles.body,
    color: Colors.brandPurple,
  },
  recentScroll: {
    gap: Spacing.sm,
  },
  recentItem: {
    width: 140,
    height: 180,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.shadow1,
  },
  recentImage: {
    width: '100%',
    height: '100%',
  },
  recentGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'flex-end',
    padding: Spacing.sm,
  },
  recentFilterName: {
    ...Typography.styles.caption,
    color: Colors.white,
    fontWeight: Typography.fontWeight.semibold,
  },
  quickAccess: {
    marginBottom: Spacing.xl,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  quickAccessCard: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quickAccessLabel: {
    ...Typography.styles.bodySmall,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
});

export default HomeScreen;
