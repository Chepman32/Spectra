/**
 * useImagePicker - Hook for image selection
 */

import {useState, useCallback} from 'react';
import {ImagePickerService} from '@services/ImagePickerService';
import {useToast} from '@components';
import type {ImageData} from '@types';

export const useImagePicker = () => {
  const [loading, setLoading] = useState(false);
  const {showToast} = useToast();

  const pickImage = useCallback(async (): Promise<ImageData | null> => {
    try {
      setLoading(true);
      const image = await ImagePickerService.pickImage();

      if (!image) {
        return null; // User cancelled
      }

      return image;
    } catch (error: any) {
      console.error('Pick image error:', error);

      if (error.message === 'Permission denied') {
        showToast({
          message: 'Photo library access denied. Please enable in Settings.',
          type: 'error',
          duration: 4000,
        });
      } else {
        showToast({
          message: 'Failed to pick image. Please try again.',
          type: 'error',
        });
      }

      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    return await ImagePickerService.checkPermission();
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    return await ImagePickerService.requestPermission();
  }, []);

  return {
    pickImage,
    checkPermission,
    requestPermission,
    loading,
  };
};

export default useImagePicker;
