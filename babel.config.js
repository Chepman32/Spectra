module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@filters': './src/filters',
          '@animations': './src/animations',
          '@skia': './src/skia',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@types': './src/types',
        },
      },
    ],
  ],
};
