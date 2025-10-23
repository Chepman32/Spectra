/**
 * Filter Engine - Core filter application logic
 * Handles applying filters to images using Skia
 */

import type {Filter} from '@types';
import {colorMatrices, createSaturationMatrix, createContrastMatrix, createBrightnessMatrix} from './implementations/colorMatrices';

// Map filter IDs to their color matrices
export const getColorMatrixForFilter = (filterId: string, intensity: number = 70): number[] | null => {
  const factor = intensity / 100;

  switch (filterId) {
    // Color Enhancement
    case 'vibrant_boost':
      return createSaturationMatrix(1 + (0.5 * factor));
    case 'clarity_plus':
      return createContrastMatrix(1 + (0.4 * factor));
    case 'vivid_dreams':
      return createSaturationMatrix(1 + (0.7 * factor));
    case 'color_pop':
      return createSaturationMatrix(1 + (0.6 * factor));
    case 'enhanced_reality':
      return createSaturationMatrix(1 + (0.3 * factor));
    case 'natural_boost':
      return createSaturationMatrix(1 + (0.2 * factor));
    case 'crisp_clear':
      return createContrastMatrix(1 + (0.3 * factor));
    case 'bright_day':
      return createBrightnessMatrix(0.1 * factor);
    case 'rich_tones':
      return createSaturationMatrix(1 + (0.4 * factor));
    case 'true_colors':
      return createSaturationMatrix(1 + (0.1 * factor));

    // Black & White
    case 'classic_bw':
      return colorMatrices.grayscale;
    case 'high_contrast':
      return colorMatrices.highContrast;
    case 'soft_mono':
      return colorMatrices.grayscale;
    case 'noir':
      return colorMatrices.noir;
    case 'dramatic_bw':
      return colorMatrices.noir;
    case 'silver_tone':
      return colorMatrices.grayscale;
    case 'pure_mono':
      return colorMatrices.grayscale;
    case 'grainy_bw':
      return colorMatrices.grayscale;
    case 'elegant_gray':
      return colorMatrices.grayscale;
    case 'timeless':
      return colorMatrices.grayscale;

    // Temperature
    case 'warm_sunset':
      return colorMatrices.warmTemperature;
    case 'cool_blue':
      return colorMatrices.coolTemperature;
    case 'neutral_balance':
      return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
    case 'arctic_cool':
      return colorMatrices.coolTemperature;
    case 'desert_heat':
      return colorMatrices.warmTemperature;
    case 'twilight':
      return colorMatrices.coolTemperature;
    case 'morning_light':
      return colorMatrices.warmTemperature;
    case 'evening_warmth':
      return colorMatrices.warmTemperature;
    case 'moonlight':
      return colorMatrices.coolTemperature;
    case 'daylight':
      return [1, 0, 0, 0, 0.05, 0, 1, 0, 0, 0.05, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];

    // Vintage
    case 'sepia_tone':
      return colorMatrices.sepia;
    case 'vintage_film':
      return colorMatrices.sepia;
    case 'retro_fade':
      return colorMatrices.sepia;
    case 'old_photo':
      return colorMatrices.sepia;
    case 'faded_memories':
      return colorMatrices.sepia;
    case 'polaroid':
      return colorMatrices.sepia;
    case 'seventies_vibe':
      return colorMatrices.sepia;
    case 'aged_paper':
      return colorMatrices.sepia;
    case 'vintage_warm':
      return colorMatrices.sepia;
    case 'retro_cool':
      return colorMatrices.sepia;

    default:
      // For filters not yet implemented, return identity matrix
      return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
  }
};

// Check if filter is implemented
export const isFilterImplemented = (filterId: string): boolean => {
  const matrix = getColorMatrixForFilter(filterId);
  return matrix !== null;
};

// Get filter category display name
export const getCategoryDisplayName = (category: string): string => {
  const names: Record<string, string> = {
    color_enhancement: 'Color Enhancement',
    vintage: 'Vintage',
    black_and_white: 'Black & White',
    light_effects: 'Light Effects',
    blur_focus: 'Blur & Focus',
    artistic: 'Artistic',
    temperature: 'Temperature',
    grain_texture: 'Grain & Texture',
    color_grading: 'Color Grading',
    special_effects: 'Special Effects',
  };
  return names[category] || category;
};

export default {
  getColorMatrixForFilter,
  isFilterImplemented,
  getCategoryDisplayName,
};
