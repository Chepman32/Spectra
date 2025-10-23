/**
 * Premium Unlock Modal - IAP purchase screen
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius, Shadows} from '@constants';
import {useToast} from '@components';
import {useAppStore} from '@store';
import {useHaptics} from '@hooks/useHaptics';
import {IAPService} from '@services/IAPService';
import type {PremiumUnlockScreenProps} from '@navigation/types';

const PremiumUnlockModal: React.FC<PremiumUnlockScreenProps> = ({navigation}) => {
  const haptics = useHaptics();
  const {showToast} = useToast();

  const unlockPremium = useAppStore(state => state.unlockPremium);

  const [purchasing, setPurchasing] = useState(false);
  const [restoring, setRestoring] = useState(false);

  // Crown animation
  const crownFloat = useSharedValue(0);

  useEffect(() => {
    crownFloat.value = withRepeat(
      withSequence(
        withTiming(-8, {duration: 1000}),
        withTiming(8, {duration: 1000}),
      ),
      -1,
      true,
    );
  }, []);

  const crownAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: crownFloat.value}],
  }));

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      haptics.medium();

      const purchase = await IAPService.purchase('com.spectra.premium.full');

      if (purchase) {
        unlockPremium();
        haptics.notification('success');
        showToast({
          message: 'Success! All filters unlocked',
          type: 'success',
          icon: 'check-circle',
        });

        // Close modal after brief delay
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      haptics.notification('error');
      showToast({
        message: 'Purchase failed. Please try again.',
        type: 'error',
      });
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    try {
      setRestoring(true);
      haptics.light();

      const purchases = await IAPService.restorePurchases();

      if (purchases.length > 0) {
        unlockPremium();
        haptics.notification('success');
        showToast({
          message: 'Purchases restored successfully',
          type: 'success',
        });

        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        showToast({
          message: 'No previous purchases found',
          type: 'info',
        });
      }
    } catch (error) {
      console.error('Restore error:', error);
      showToast({
        message: 'Failed to restore purchases',
        type: 'error',
      });
    } finally {
      setRestoring(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Drag Handle */}
        <View style={styles.dragHandle} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Crown Icon */}
          <Animated.View style={[styles.crownContainer, crownAnimatedStyle]}>
            <LinearGradient
              colors={['#F59E0B', '#FBBF24']}
              style={styles.crownCircle}>
              <Icon name="award" size={64} color={Colors.white} />
            </LinearGradient>
          </Animated.View>

          {/* Headline */}
          <Text style={styles.headline}>Unlock Everything</Text>

          {/* Description */}
          <Text style={styles.description}>
            Access all 100 premium filters with one-time purchase
          </Text>

          {/* Features */}
          <View style={styles.features}>
            <FeatureItem icon="check-circle" text="80 Premium Filters" />
            <FeatureItem icon="trending-up" text="Future Filter Updates" />
            <FeatureItem icon="x-circle" text="No Subscription" />
            <FeatureItem icon="clock" text="Lifetime Access" />
          </View>

          {/* Purchase Button */}
          <TouchableOpacity
            onPress={handlePurchase}
            disabled={purchasing || restoring}
            style={styles.purchaseButton}
            activeOpacity={0.8}>
            <LinearGradient
              colors={['#8B5CF6', '#6D28D9']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.purchaseButtonGradient}>
              {purchasing ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <Text style={styles.purchaseButtonText}>Unlock for $9.99</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Restore Purchases */}
          <TouchableOpacity
            onPress={handleRestore}
            disabled={purchasing || restoring}
            style={styles.restoreButton}>
            {restoring ? (
              <ActivityIndicator size="small" color={Colors.brandPurple} />
            ) : (
              <Text style={styles.restoreButtonText}>Restore Purchases</Text>
            )}
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.terms}>
            One-time purchase. No recurring fees. Cancel anytime before
            purchase.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const FeatureItem: React.FC<{icon: string; text: string}> = ({icon, text}) => (
  <View style={styles.featureItem}>
    <Icon name={icon} size={24} color={Colors.success} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  safeArea: {
    flex: 1,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  crownContainer: {
    marginBottom: Spacing.xl,
  },
  crownCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.shadow3,
  },
  headline: {
    ...Typography.styles.display,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  description: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  features: {
    width: '100%',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureText: {
    ...Typography.styles.body,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  purchaseButton: {
    width: '100%',
    height: 56,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.shadow3,
    marginBottom: Spacing.md,
  },
  purchaseButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  purchaseButtonText: {
    ...Typography.styles.h3,
    color: Colors.white,
    fontWeight: Typography.fontWeight.bold,
  },
  restoreButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  restoreButtonText: {
    ...Typography.styles.bodySmall,
    color: Colors.brandPurple,
    fontWeight: Typography.fontWeight.semibold,
  },
  terms: {
    ...Typography.styles.caption,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PremiumUnlockModal;
