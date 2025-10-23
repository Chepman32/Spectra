/**
 * Color Matrices - Pre-defined color matrices for filters
 * Used with Skia ColorMatrix filter
 */

// Color matrix type: 4x5 matrix (20 values)
export type ColorMatrix = number[];

// Helper to create saturation matrix
export const createSaturationMatrix = (saturation: number): ColorMatrix => {
  const s = saturation;
  const sr = (1 - s) * 0.3086;
  const sg = (1 - s) * 0.6094;
  const sb = (1 - s) * 0.082;

  return [
    sr + s, sg,     sb,     0, 0,
    sr,     sg + s, sb,     0, 0,
    sr,     sg,     sb + s, 0, 0,
    0,      0,      0,      1, 0,
  ];
};

// Helper to create contrast matrix
export const createContrastMatrix = (contrast: number): ColorMatrix => {
  const c = contrast;
  const t = (1 - c) / 2;

  return [
    c, 0, 0, 0, t,
    0, c, 0, 0, t,
    0, 0, c, 0, t,
    0, 0, 0, 1, 0,
  ];
};

// Helper to create brightness matrix
export const createBrightnessMatrix = (brightness: number): ColorMatrix => {
  return [
    1, 0, 0, 0, brightness,
    0, 1, 0, 0, brightness,
    0, 0, 1, 0, brightness,
    0, 0, 0, 1, 0,
  ];
};

// Grayscale matrix
export const grayscaleMatrix: ColorMatrix = [
  0.299,  0.587,  0.114,  0, 0,
  0.299,  0.587,  0.114,  0, 0,
  0.299,  0.587,  0.114,  0, 0,
  0,      0,      0,      1, 0,
];

// Sepia matrix
export const sepiaMatrix: ColorMatrix = [
  0.393, 0.769, 0.189, 0, 0,
  0.349, 0.686, 0.168, 0, 0,
  0.272, 0.534, 0.131, 0, 0,
  0,     0,     0,     1, 0,
];

// Vibrant boost matrix
export const vibrantBoostMatrix: ColorMatrix = createSaturationMatrix(1.5);

// Warm temperature matrix
export const warmTemperatureMatrix: ColorMatrix = [
  1.1, 0,   0,   0, 0.05,
  0,   1.0, 0,   0, 0,
  0,   0,   0.9, 0, -0.05,
  0,   0,   0,   1, 0,
];

// Cool temperature matrix
export const coolTemperatureMatrix: ColorMatrix = [
  0.9, 0,   0,   0, -0.05,
  0,   1.0, 0,   0, 0,
  0,   0,   1.1, 0, 0.05,
  0,   0,   0,   1, 0,
];

// High contrast matrix
export const highContrastMatrix: ColorMatrix = createContrastMatrix(1.4);

// Noir effect matrix (high contrast B&W)
export const noirMatrix: ColorMatrix = [
  0.4, 0.8, 0.16, 0, -0.1,
  0.4, 0.8, 0.16, 0, -0.1,
  0.4, 0.8, 0.16, 0, -0.1,
  0,   0,   0,    1, 0,
];

// Combine matrices (multiply)
export const combineMatrices = (m1: ColorMatrix, m2: ColorMatrix): ColorMatrix => {
  const result: ColorMatrix = new Array(20).fill(0);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 5; j++) {
      if (j < 4) {
        for (let k = 0; k < 4; k++) {
          result[i * 5 + j] += m1[i * 5 + k] * m2[k * 5 + j];
        }
      } else {
        result[i * 5 + j] = m1[i * 5 + j] + m2[i * 5 + j];
      }
    }
  }

  return result;
};

// Export all matrices
export const colorMatrices = {
  grayscale: grayscaleMatrix,
  sepia: sepiaMatrix,
  vibrantBoost: vibrantBoostMatrix,
  warmTemperature: warmTemperatureMatrix,
  coolTemperature: coolTemperatureMatrix,
  highContrast: highContrastMatrix,
  noir: noirMatrix,
};
