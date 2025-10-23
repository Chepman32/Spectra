/**
 * Filter Definitions - All 100 filters
 * Organized by category with metadata
 */

import type {Filter, FilterCategory} from '@types';

// Helper function to create filter definition
const createFilter = (
  id: string,
  name: string,
  category: FilterCategory,
  isPremium: boolean = false,
): Filter => ({
  id,
  name,
  category,
  isPremium,
  intensity: {min: 0, max: 100, default: 70},
  usageCount: 0,
  lastUsed: null,
  isFavorite: false,
});

export const filterDefinitions: Filter[] = [
  // Color Enhancement (1-10) - FREE
  createFilter('vibrant_boost', 'Vibrant Boost', 'color_enhancement', false),
  createFilter('clarity_plus', 'Clarity Plus', 'color_enhancement', false),
  createFilter('vivid_dreams', 'Vivid Dreams', 'color_enhancement', false),
  createFilter('color_pop', 'Color Pop', 'color_enhancement', false),
  createFilter('enhanced_reality', 'Enhanced Reality', 'color_enhancement', false),
  createFilter('natural_boost', 'Natural Boost', 'color_enhancement', false),
  createFilter('crisp_clear', 'Crisp & Clear', 'color_enhancement', false),
  createFilter('bright_day', 'Bright Day', 'color_enhancement', false),
  createFilter('rich_tones', 'Rich Tones', 'color_enhancement', false),
  createFilter('true_colors', 'True Colors', 'color_enhancement', false),

  // Vintage/Retro (11-20) - PREMIUM
  createFilter('vintage_film', 'Vintage Film', 'vintage', true),
  createFilter('retro_fade', 'Retro Fade', 'vintage', true),
  createFilter('old_photo', 'Old Photo', 'vintage', true),
  createFilter('sepia_tone', 'Sepia Tone', 'vintage', true),
  createFilter('faded_memories', 'Faded Memories', 'vintage', true),
  createFilter('polaroid', 'Polaroid', 'vintage', true),
  createFilter('seventies_vibe', '70s Vibe', 'vintage', true),
  createFilter('aged_paper', 'Aged Paper', 'vintage', true),
  createFilter('vintage_warm', 'Vintage Warm', 'vintage', true),
  createFilter('retro_cool', 'Retro Cool', 'vintage', true),

  // Black & White (21-30) - FREE
  createFilter('classic_bw', 'Classic B&W', 'black_and_white', false),
  createFilter('high_contrast', 'High Contrast', 'black_and_white', false),
  createFilter('soft_mono', 'Soft Mono', 'black_and_white', false),
  createFilter('noir', 'Noir', 'black_and_white', false),
  createFilter('dramatic_bw', 'Dramatic B&W', 'black_and_white', false),
  createFilter('silver_tone', 'Silver Tone', 'black_and_white', false),
  createFilter('pure_mono', 'Pure Mono', 'black_and_white', false),
  createFilter('grainy_bw', 'Grainy B&W', 'black_and_white', false),
  createFilter('elegant_gray', 'Elegant Gray', 'black_and_white', false),
  createFilter('timeless', 'Timeless', 'black_and_white', false),

  // Light Effects (31-40) - PREMIUM
  createFilter('golden_hour', 'Golden Hour', 'light_effects', true),
  createFilter('lens_flare', 'Lens Flare', 'light_effects', true),
  createFilter('soft_glow', 'Soft Glow', 'light_effects', true),
  createFilter('sun_kissed', 'Sun Kissed', 'light_effects', true),
  createFilter('light_leaks', 'Light Leaks', 'light_effects', true),
  createFilter('hazy_sunshine', 'Hazy Sunshine', 'light_effects', true),
  createFilter('radiant', 'Radiant', 'light_effects', true),
  createFilter('dreamy_light', 'Dreamy Light', 'light_effects', true),
  createFilter('warm_glow', 'Warm Glow', 'light_effects', true),
  createFilter('luminous', 'Luminous', 'light_effects', true),

  // Blur & Focus (41-50) - PREMIUM
  createFilter('tilt_shift', 'Tilt Shift', 'blur_focus', true),
  createFilter('bokeh', 'Bokeh', 'blur_focus', true),
  createFilter('radial_blur', 'Radial Blur', 'blur_focus', true),
  createFilter('soft_focus', 'Soft Focus', 'blur_focus', true),
  createFilter('depth_field', 'Depth of Field', 'blur_focus', true),
  createFilter('motion_blur', 'Motion Blur', 'blur_focus', true),
  createFilter('gaussian_blur', 'Gaussian Blur', 'blur_focus', true),
  createFilter('dreamy_blur', 'Dreamy Blur', 'blur_focus', true),
  createFilter('selective_focus', 'Selective Focus', 'blur_focus', true),
  createFilter('portrait_blur', 'Portrait Blur', 'blur_focus', true),

  // Artistic Styles (51-60) - PREMIUM
  createFilter('oil_painting', 'Oil Painting', 'artistic', true),
  createFilter('watercolor', 'Watercolor', 'artistic', true),
  createFilter('pencil_sketch', 'Pencil Sketch', 'artistic', true),
  createFilter('ink_drawing', 'Ink Drawing', 'artistic', true),
  createFilter('impressionist', 'Impressionist', 'artistic', true),
  createFilter('pop_art', 'Pop Art', 'artistic', true),
  createFilter('cartoon', 'Cartoon', 'artistic', true),
  createFilter('comic_book', 'Comic Book', 'artistic', true),
  createFilter('pastel', 'Pastel', 'artistic', true),
  createFilter('abstract', 'Abstract', 'artistic', true),

  // Temperature (61-70) - FREE
  createFilter('warm_sunset', 'Warm Sunset', 'temperature', false),
  createFilter('cool_blue', 'Cool Blue', 'temperature', false),
  createFilter('neutral_balance', 'Neutral Balance', 'temperature', false),
  createFilter('arctic_cool', 'Arctic Cool', 'temperature', false),
  createFilter('desert_heat', 'Desert Heat', 'temperature', false),
  createFilter('twilight', 'Twilight', 'temperature', false),
  createFilter('morning_light', 'Morning Light', 'temperature', false),
  createFilter('evening_warmth', 'Evening Warmth', 'temperature', false),
  createFilter('moonlight', 'Moonlight', 'temperature', false),
  createFilter('daylight', 'Daylight', 'temperature', false),

  // Grain & Texture (71-80) - PREMIUM
  createFilter('film_grain', 'Film Grain', 'grain_texture', true),
  createFilter('noise_texture', 'Noise Texture', 'grain_texture', true),
  createFilter('halftone', 'Halftone', 'grain_texture', true),
  createFilter('vintage_grain', 'Vintage Grain', 'grain_texture', true),
  createFilter('grainy_film', 'Grainy Film', 'grain_texture', true),
  createFilter('textured', 'Textured', 'grain_texture', true),
  createFilter('paper_texture', 'Paper Texture', 'grain_texture', true),
  createFilter('canvas', 'Canvas', 'grain_texture', true),
  createFilter('rough_print', 'Rough Print', 'grain_texture', true),
  createFilter('analog_noise', 'Analog Noise', 'grain_texture', true),

  // Color Grading (81-90) - PREMIUM
  createFilter('cinematic', 'Cinematic', 'color_grading', true),
  createFilter('teal_orange', 'Teal & Orange', 'color_grading', true),
  createFilter('moody_blue', 'Moody Blue', 'color_grading', true),
  createFilter('warm_vintage', 'Warm Vintage', 'color_grading', true),
  createFilter('cool_tones', 'Cool Tones', 'color_grading', true),
  createFilter('faded_look', 'Faded Look', 'color_grading', true),
  createFilter('matte_finish', 'Matte Finish', 'color_grading', true),
  createFilter('rich_contrast', 'Rich Contrast', 'color_grading', true),
  createFilter('pastel_grade', 'Pastel Grade', 'color_grading', true),
  createFilter('film_look', 'Film Look', 'color_grading', true),

  // Special Effects (91-100) - PREMIUM
  createFilter('double_exposure', 'Double Exposure', 'special_effects', true),
  createFilter('prism', 'Prism', 'special_effects', true),
  createFilter('kaleidoscope', 'Kaleidoscope', 'special_effects', true),
  createFilter('mirror', 'Mirror', 'special_effects', true),
  createFilter('vhs_glitch', 'VHS Glitch', 'special_effects', true),
  createFilter('neon_glow', 'Neon Glow', 'special_effects', true),
  createFilter('holographic', 'Holographic', 'special_effects', true),
  createFilter('chromatic', 'Chromatic', 'special_effects', true),
  createFilter('pixel_sort', 'Pixel Sort', 'special_effects', true),
  createFilter('digital_art', 'Digital Art', 'special_effects', true),
];

// Export filter count for UI display
export const FILTER_COUNT = filterDefinitions.length;

// Export filters by category
export const filtersByCategory = filterDefinitions.reduce((acc, filter) => {
  if (!acc[filter.category]) {
    acc[filter.category] = [];
  }
  acc[filter.category].push(filter);
  return acc;
}, {} as Record<FilterCategory, Filter[]>);

// Export premium and free filters
export const freeFilters = filterDefinitions.filter(f => !f.isPremium);
export const premiumFilters = filterDefinitions.filter(f => f.isPremium);
