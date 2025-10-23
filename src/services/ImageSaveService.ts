/**
 * Image Save Service - Save filtered images to device
 */

import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import type {SavedPhoto} from '@types';

export interface SaveOptions {
  quality: 'high' | 'medium' | 'low';
  format?: 'jpg' | 'png';
  saveToLibrary?: boolean;
}

export class ImageSaveService {
  /**
   * Check if we have permission to save photos
   */
  static async checkSavePermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    });

    if (!permission) return false;

    const result = await check(permission);
    return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
  }

  /**
   * Request permission to save photos
   */
  static async requestSavePermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    });

    if (!permission) return false;

    const result = await request(permission);
    return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
  }

  /**
   * Save image to photo library
   */
  static async saveImage(
    imageUri: string,
    filterId: string,
    filterName: string,
    options: SaveOptions = {quality: 'high', saveToLibrary: true},
  ): Promise<SavedPhoto> {
    try {
      // Check permission
      if (options.saveToLibrary) {
        const hasPermission = await this.checkSavePermission();
        if (!hasPermission) {
          const granted = await this.requestSavePermission();
          if (!granted) {
            throw new Error('Permission denied');
          }
        }
      }

      // Save to camera roll
      let savedUri = imageUri;
      if (options.saveToLibrary) {
        savedUri = await CameraRoll.save(imageUri, {type: 'photo'});
      }

      // Generate unique ID
      const id = `spectra_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create saved photo object
      const savedPhoto: SavedPhoto = {
        id,
        uri: savedUri,
        width: 0, // Will be populated when image loads
        height: 0,
        filename: `spectra_${filterId}_${Date.now()}.jpg`,
        filterId,
        filterName,
        createdAt: new Date(),
        quality: options.quality,
      };

      return savedPhoto;
    } catch (error) {
      console.error('Image save error:', error);
      throw error;
    }
  }

  /**
   * Get quality value (0-1) from quality setting
   */
  static getQualityValue(quality: 'high' | 'medium' | 'low'): number {
    switch (quality) {
      case 'high':
        return 1.0;
      case 'medium':
        return 0.85;
      case 'low':
        return 0.7;
      default:
        return 1.0;
    }
  }
}

export default ImageSaveService;
