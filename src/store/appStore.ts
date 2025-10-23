/**
 * App Store - Global application state management
 * Using Zustand for state management
 */

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {AppState, ImageData, Filter, SavedPhoto, AppPreferences} from '@types';

interface AppStore extends AppState {
  // Actions
  setCurrentImage: (image: ImageData | null) => void;
  setCurrentFilter: (filter: Filter | null) => void;
  addToHistory: (imageUri: string, filterId: string) => void;
  savePhoto: (photo: SavedPhoto) => void;
  deletePhoto: (photoId: string) => void;
  updatePreferences: (updates: Partial<AppPreferences>) => void;
  unlockPremium: (purchaseDate?: Date) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  reset: () => void;
}

const defaultPreferences: AppPreferences = {
  hapticEnabled: true,
  autoSave: true,
  imageQuality: 'high',
  previewQuality: 'medium',
  gridColumns: 3,
  showFilterCount: true,
};

const initialState: AppState = {
  preferences: defaultPreferences,
  currentImage: null,
  currentFilter: null,
  editHistory: [],
  savedPhotos: [],
  isPremium: false,
  purchaseDate: null,
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentImage: (image) => {
        set({currentImage: image});
      },

      setCurrentFilter: (filter) => {
        set({currentFilter: filter});
      },

      addToHistory: (imageUri, filterId) => {
        const history = get().editHistory;
        const newItem = {
          imageUri,
          filterId,
          timestamp: new Date(),
        };
        set({
          editHistory: [newItem, ...history].slice(0, 50), // Keep last 50
        });
      },

      savePhoto: (photo) => {
        const photos = get().savedPhotos;
        set({
          savedPhotos: [photo, ...photos],
        });
      },

      deletePhoto: (photoId) => {
        const photos = get().savedPhotos;
        set({
          savedPhotos: photos.filter(p => p.id !== photoId),
        });
      },

      updatePreferences: (updates) => {
        const currentPrefs = get().preferences;
        set({
          preferences: {...currentPrefs, ...updates},
        });
      },

      unlockPremium: (purchaseDate = new Date()) => {
        set({
          isPremium: true,
          purchaseDate,
        });
      },

      setLoading: (loading) => {
        set({isLoading: loading});
      },

      setError: (error) => {
        set({error});
      },

      clearError: () => {
        set({error: null});
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'spectra-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        preferences: state.preferences,
        savedPhotos: state.savedPhotos,
        isPremium: state.isPremium,
        purchaseDate: state.purchaseDate,
        editHistory: state.editHistory,
      }),
    },
  ),
);
