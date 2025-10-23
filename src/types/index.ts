/**
 * Spectra - TypeScript Type Definitions
 */

// Filter Types
export interface Filter {
  id: string;
  name: string;
  category: FilterCategory;
  isPremium: boolean;
  thumbnailColor?: string;
  intensity?: {
    min: number;
    max: number;
    default: number;
  };
  shaderType?: 'color_matrix' | 'blend_mode' | 'custom';
  shaderParams?: any;
  jsFunction?: (image: any, intensity: number) => any;
  usageCount: number;
  lastUsed: Date | null;
  isFavorite: boolean;
}

export type FilterCategory =
  | 'color_enhancement'
  | 'vintage'
  | 'black_and_white'
  | 'light_effects'
  | 'blur_focus'
  | 'artistic'
  | 'temperature'
  | 'grain_texture'
  | 'color_grading'
  | 'special_effects';

// Image Types
export interface ImageData {
  uri: string;
  width: number;
  height: number;
  filename?: string;
  timestamp?: Date;
}

export interface SavedPhoto extends ImageData {
  id: string;
  filterId: string;
  filterName: string;
  createdAt: Date;
  quality: 'high' | 'medium' | 'low';
}

// App State Types
export interface AppPreferences {
  hapticEnabled: boolean;
  autoSave: boolean;
  imageQuality: 'high' | 'medium' | 'low';
  previewQuality: 'high' | 'medium' | 'low';
  gridColumns: 2 | 3 | 4;
  showFilterCount: boolean;
}

export interface AppState {
  preferences: AppPreferences;
  currentImage: ImageData | null;
  currentFilter: Filter | null;
  editHistory: EditHistoryItem[];
  savedPhotos: SavedPhoto[];
  isPremium: boolean;
  purchaseDate: Date | null;
  isLoading: boolean;
  error: string | null;
}

export interface EditHistoryItem {
  imageUri: string;
  filterId: string;
  timestamp: Date;
}

// IAP Types
export type ProductId =
  | 'com.spectra.premium.full'
  | 'com.spectra.pack.vintage'
  | 'com.spectra.pack.artistic'
  | 'com.spectra.pack.professional';

export interface IAPProduct {
  productId: ProductId;
  title: string;
  description: string;
  price: string;
  localizedPrice: string;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  FilterStudio: {imageUri?: string};
  Library: undefined;
  Settings: undefined;
  PremiumUnlock: undefined;
};

// Export all types
export type * from './index';
