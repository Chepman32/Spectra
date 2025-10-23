/**
 * Image Picker Service - Handle image selection and permissions
 */

import {launchImageLibrary, ImagePickerResponse} from 'react-native-image-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import type {ImageData} from '@types';

export class ImagePickerService {
  /**
   * Check if we have photo library permission
   */
  static async checkPermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    if (!permission) return false;

    const result = await check(permission);
    return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
  }

  /**
   * Request photo library permission
   */
  static async requestPermission(): Promise<boolean> {
    const permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    });

    if (!permission) return false;

    const result = await request(permission);
    return result === RESULTS.GRANTED || result === RESULTS.LIMITED;
  }

  /**
   * Pick an image from the library
   */
  static async pickImage(): Promise<ImageData | null> {
    try {
      // Check permission first
      const hasPermission = await this.checkPermission();
      if (!hasPermission) {
        const granted = await this.requestPermission();
        if (!granted) {
          throw new Error('Permission denied');
        }
      }

      // Launch image picker
      const response: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      });

      if (response.didCancel) {
        return null;
      }

      if (response.errorCode || response.errorMessage) {
        throw new Error(response.errorMessage || 'Failed to pick image');
      }

      const asset = response.assets?.[0];
      if (!asset || !asset.uri) {
        throw new Error('No image selected');
      }

      return {
        uri: asset.uri,
        width: asset.width || 0,
        height: asset.height || 0,
        filename: asset.fileName,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Image picker error:', error);
      throw error;
    }
  }
}

export default ImagePickerService;
