/**
 * Settings Screen - App preferences and configuration
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {Colors, Typography, Spacing, BorderRadius, Shadows} from '@constants';
import {useAppStore} from '@store';
import {CacheService} from '@services/CacheService';
import {useToast} from '@components';
import {useHaptics} from '@hooks/useHaptics';
import type {SettingsScreenProps} from '@navigation/types';

const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const haptics = useHaptics();
  const {showToast} = useToast();

  const preferences = useAppStore(state => state.preferences);
  const updatePreferences = useAppStore(state => state.updatePreferences);
  const isPremium = useAppStore(state => state.isPremium);

  const handleToggle = (key: keyof typeof preferences) => {
    haptics.light();
    updatePreferences({[key]: !preferences[key]});
  };

  const handleQualityChange = (quality: 'high' | 'medium' | 'low') => {
    haptics.light();
    updatePreferences({imageQuality: quality});
  };

  const handleGridColumnsChange = (columns: 2 | 3 | 4) => {
    haptics.light();
    updatePreferences({gridColumns: columns});
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached filter previews. Are you sure?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            CacheService.clear();
            haptics.notification('success');
            showToast({
              message: 'Cache cleared successfully',
              type: 'success',
            });
          },
        },
      ],
    );
  };

  const handlePremiumUnlock = () => {
    haptics.medium();
    navigation.navigate('PremiumUnlock');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* General Section */}
        <Text style={styles.sectionHeader}>GENERAL</Text>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert('Image Quality', 'Select save quality', [
                {text: 'High (100%)', onPress: () => handleQualityChange('high')},
                {text: 'Medium (85%)', onPress: () => handleQualityChange('medium')},
                {text: 'Low (70%)', onPress: () => handleQualityChange('low')},
                {text: 'Cancel', style: 'cancel'},
              ]);
            }}>
            <Text style={styles.rowLabel}>Image Quality</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{preferences.imageQuality}</Text>
              <Icon name="chevron-right" size={16} color={Colors.textTertiary} />
            </View>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Auto-Save</Text>
            <Switch
              value={preferences.autoSave}
              onValueChange={() => handleToggle('autoSave')}
              trackColor={{false: Colors.border, true: Colors.brandPurple}}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Haptic Feedback</Text>
            <Switch
              value={preferences.hapticEnabled}
              onValueChange={() => handleToggle('hapticEnabled')}
              trackColor={{false: Colors.border, true: Colors.brandPurple}}
            />
          </View>
        </View>

        {/* Filters & Display Section */}
        <Text style={styles.sectionHeader}>FILTERS & DISPLAY</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Show Filter Count</Text>
            <Switch
              value={preferences.showFilterCount}
              onValueChange={() => handleToggle('showFilterCount')}
              trackColor={{false: Colors.border, true: Colors.brandPurple}}
            />
          </View>

          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert('Preview Quality', 'Select preview quality', [
                {text: 'High', onPress: () => updatePreferences({previewQuality: 'high'})},
                {text: 'Medium', onPress: () => updatePreferences({previewQuality: 'medium'})},
                {text: 'Low', onPress: () => updatePreferences({previewQuality: 'low'})},
                {text: 'Cancel', style: 'cancel'},
              ]);
            }}>
            <Text style={styles.rowLabel}>Preview Quality</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{preferences.previewQuality}</Text>
              <Icon name="chevron-right" size={16} color={Colors.textTertiary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              Alert.alert('Grid Columns', 'Select number of columns', [
                {text: '2 Columns', onPress: () => handleGridColumnsChange(2)},
                {text: '3 Columns', onPress: () => handleGridColumnsChange(3)},
                {text: '4 Columns', onPress: () => handleGridColumnsChange(4)},
                {text: 'Cancel', style: 'cancel'},
              ]);
            }}>
            <Text style={styles.rowLabel}>Grid Columns</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{preferences.gridColumns}</Text>
              <Icon name="chevron-right" size={16} color={Colors.textTertiary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Storage Section */}
        <Text style={styles.sectionHeader}>STORAGE</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Cache Size</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>{CacheService.getCacheSizeFormatted()}</Text>
              <Icon name="chevron-right" size={16} color={Colors.textTertiary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleClearCache}>
            <Text style={[styles.rowLabel, {color: Colors.error}]}>Clear Cache</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <Text style={styles.sectionHeader}>ABOUT</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Privacy Policy</Text>
            <Icon name="chevron-right" size={16} color={Colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Terms of Service</Text>
            <Icon name="chevron-right" size={16} color={Colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Rate Spectra</Text>
            <Icon name="chevron-right" size={16} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Premium Unlock */}
        {!isPremium && (
          <>
            <Text style={styles.sectionHeader}>PREMIUM</Text>
            <TouchableOpacity onPress={handlePremiumUnlock} style={styles.premiumCard}>
              <Icon name="award" size={24} color={Colors.warning} />
              <Text style={styles.premiumText}>Unlock All Filters</Text>
              <Icon name="chevron-right" size={20} color={Colors.warning} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    ...Typography.styles.h2,
    color: Colors.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  sectionHeader: {
    ...Typography.styles.label,
    color: Colors.textTertiary,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.shadow1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceLight,
    minHeight: 52,
  },
  rowLabel: {
    ...Typography.styles.body,
    color: Colors.textPrimary,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rowValue: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.warning,
    ...Shadows.shadow2,
  },
  premiumText: {
    ...Typography.styles.h3,
    color: Colors.warning,
    flex: 1,
  },
});

export default SettingsScreen;
