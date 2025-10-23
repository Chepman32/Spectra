/**
 * Library Screen - Grid view of saved photos
 */

import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Colors, Typography, Spacing, BorderRadius, Shadows} from '@constants';
import {useAppStore} from '@store';
import {useHaptics} from '@hooks/useHaptics';
import type {LibraryScreenProps} from '@navigation/types';
import type {SavedPhoto} from '@types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_SIZE = (SCREEN_WIDTH - 4) / 3; // 3 columns with 2px gaps

const LibraryScreen: React.FC<LibraryScreenProps> = ({navigation}) => {
  const haptics = useHaptics();
  const savedPhotos = useAppStore(state => state.savedPhotos);
  const deletePhoto = useAppStore(state => state.deletePhoto);
  const setCurrentImage = useAppStore(state => state.setCurrentImage);

  const [selectedPhoto, setSelectedPhoto] = useState<SavedPhoto | null>(null);

  const handlePhotoPress = useCallback(
    (photo: SavedPhoto) => {
      haptics.light();
      setSelectedPhoto(photo);
    },
    [haptics],
  );

  const handleClosePreview = useCallback(() => {
    haptics.light();
    setSelectedPhoto(null);
  }, [haptics]);

  const handleEditAgain = useCallback(() => {
    if (selectedPhoto) {
      setCurrentImage({
        uri: selectedPhoto.uri,
        width: selectedPhoto.width,
        height: selectedPhoto.height,
      });
      setSelectedPhoto(null);
      navigation.navigate('FilterStudio', {imageUri: selectedPhoto.uri});
    }
  }, [selectedPhoto, setCurrentImage, navigation]);

  const handleDelete = useCallback(() => {
    if (selectedPhoto) {
      haptics.notification('warning');
      deletePhoto(selectedPhoto.id);
      setSelectedPhoto(null);
    }
  }, [selectedPhoto, deletePhoto, haptics]);

  const renderPhotoItem = ({item}: {item: SavedPhoto}) => (
    <Animated.View entering={FadeIn}>
      <TouchableOpacity onPress={() => handlePhotoPress(item)} style={styles.gridItem}>
        <Image source={{uri: item.uri}} style={styles.gridImage} />
        <View style={styles.filterBadge}>
          <View style={styles.filterDot} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="image" size={64} color={Colors.textTertiary} />
      <Text style={styles.emptyTitle}>No Photos Yet</Text>
      <Text style={styles.emptySubtitle}>Create your first filtered photo</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Library</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="more-vertical" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Photo Grid */}
      <FlatList
        data={savedPhotos}
        renderItem={renderPhotoItem}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* Photo Preview Modal */}
      <Modal
        visible={selectedPhoto !== null}
        transparent
        animationType="fade"
        onRequestClose={handleClosePreview}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleClosePreview}
          />

          {selectedPhoto && (
            <View style={styles.modalContent}>
              {/* Close Button */}
              <TouchableOpacity
                onPress={handleClosePreview}
                style={styles.modalCloseButton}>
                <Icon name="x" size={24} color={Colors.white} />
              </TouchableOpacity>

              {/* Image */}
              <Image source={{uri: selectedPhoto.uri}} style={styles.modalImage} resizeMode="contain" />

              {/* Metadata */}
              <View style={styles.modalMetadata}>
                <Text style={styles.modalFilename} numberOfLines={1}>
                  {selectedPhoto.filename || 'Untitled'}
                </Text>
                <Text style={styles.modalInfo}>
                  {selectedPhoto.filterName} • {this.formatDate(selectedPhoto.createdAt)}
                </Text>
              </View>

              {/* Actions */}
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={handleDelete} style={styles.modalActionButton}>
                  <Icon name="trash-2" size={20} color={Colors.error} />
                  <Text style={[styles.modalActionText, {color: Colors.error}]}>
                    Delete
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleEditAgain}
                  style={[styles.modalActionButton, styles.modalPrimaryAction]}>
                  <Icon name="edit-2" size={20} color={Colors.white} />
                  <Text style={[styles.modalActionText, {color: Colors.white}]}>
                    Edit Again
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return new Date(date).toLocaleDateString();
  }
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
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  gridContainer: {
    flexGrow: 1,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderWidth: 1,
    borderColor: Colors.backgroundDark,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  filterBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.brandPurple,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    ...Typography.styles.h2,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  emptySubtitle: {
    ...Typography.styles.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  emptyButton: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.brandPurple,
    borderRadius: BorderRadius.md,
  },
  emptyButtonText: {
    ...Typography.styles.body,
    color: Colors.white,
    fontWeight: Typography.fontWeight.semibold,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  modalMetadata: {
    padding: Spacing.md,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  modalFilename: {
    ...Typography.styles.body,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  modalInfo: {
    ...Typography.styles.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
  },
  modalActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceLight,
  },
  modalPrimaryAction: {
    backgroundColor: Colors.brandPurple,
  },
  modalActionText: {
    ...Typography.styles.body,
    fontWeight: Typography.fontWeight.semibold,
  },
});

export default LibraryScreen;
