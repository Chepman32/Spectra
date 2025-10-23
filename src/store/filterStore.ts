/**
 * Filter Store - Filter-specific state management
 */

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Filter} from '@types';

interface FilterStore {
  filters: Filter[];
  filterCache: Record<string, string>; // filterId -> base64 preview
  favorites: string[]; // Array of filter IDs
  recentlyUsed: string[]; // Array of filter IDs
  categoryExpanded: Record<string, boolean>;

  // Actions
  setFilters: (filters: Filter[]) => void;
  getFilterById: (id: string) => Filter | undefined;
  cachePreview: (filterId: string, preview: string) => void;
  getCachedPreview: (filterId: string) => string | undefined;
  clearCache: () => void;
  toggleFavorite: (filterId: string) => void;
  addToRecent: (filterId: string) => void;
  incrementUsage: (filterId: string) => void;
  toggleCategory: (category: string) => void;
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      filters: [],
      filterCache: {},
      favorites: [],
      recentlyUsed: [],
      categoryExpanded: {},

      setFilters: (filters) => {
        set({filters});
      },

      getFilterById: (id) => {
        return get().filters.find(f => f.id === id);
      },

      cachePreview: (filterId, preview) => {
        const cache = get().filterCache;
        set({
          filterCache: {...cache, [filterId]: preview},
        });
      },

      getCachedPreview: (filterId) => {
        return get().filterCache[filterId];
      },

      clearCache: () => {
        set({filterCache: {}});
      },

      toggleFavorite: (filterId) => {
        const favorites = get().favorites;
        const index = favorites.indexOf(filterId);

        if (index > -1) {
          set({favorites: favorites.filter(id => id !== filterId)});
        } else {
          set({favorites: [...favorites, filterId]});
        }

        // Update filter metadata
        const filters = get().filters;
        const updatedFilters = filters.map(f =>
          f.id === filterId ? {...f, isFavorite: !f.isFavorite} : f,
        );
        set({filters: updatedFilters});
      },

      addToRecent: (filterId) => {
        const recent = get().recentlyUsed;
        const filtered = recent.filter(id => id !== filterId);
        set({
          recentlyUsed: [filterId, ...filtered].slice(0, 20), // Keep last 20
        });
      },

      incrementUsage: (filterId) => {
        const filters = get().filters;
        const updatedFilters = filters.map(f =>
          f.id === filterId
            ? {
                ...f,
                usageCount: f.usageCount + 1,
                lastUsed: new Date(),
              }
            : f,
        );
        set({filters: updatedFilters});
        get().addToRecent(filterId);
      },

      toggleCategory: (category) => {
        const expanded = get().categoryExpanded;
        set({
          categoryExpanded: {
            ...expanded,
            [category]: !expanded[category],
          },
        });
      },
    }),
    {
      name: 'spectra-filter-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyUsed: state.recentlyUsed,
        categoryExpanded: state.categoryExpanded,
        filters: state.filters.map(f => ({
          ...f,
          usageCount: f.usageCount,
          lastUsed: f.lastUsed,
          isFavorite: f.isFavorite,
        })),
      }),
    },
  ),
);
