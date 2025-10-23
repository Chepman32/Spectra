/**
 * FilteredImage - Skia component for real-time filter application
 */

import React, {useMemo} from 'react';
import {Canvas, Image, ColorMatrix, useImage} from '@shopify/react-native-skia';
import {StyleSheet, View} from 'react-native';
import {getColorMatrixForFilter} from '@filters/filterEngine';

interface FilteredImageProps {
  imageUri: string;
  filterId: string | null;
  intensity?: number;
  width: number;
  height: number;
}

const FilteredImage: React.FC<FilteredImageProps> = ({
  imageUri,
  filterId,
  intensity = 70,
  width,
  height,
}) => {
  const image = useImage(imageUri);

  const colorMatrix = useMemo(() => {
    if (!filterId) {
      // Identity matrix (no filter)
      return [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
    }
    return getColorMatrixForFilter(filterId, intensity);
  }, [filterId, intensity]);

  if (!image) {
    return (
      <View style={[styles.container, {width, height}]}>
        {/* Loading placeholder */}
      </View>
    );
  }

  return (
    <Canvas style={[styles.container, {width, height}]}>
      <Image
        image={image}
        fit="contain"
        x={0}
        y={0}
        width={width}
        height={height}>
        <ColorMatrix matrix={colorMatrix} />
      </Image>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
});

export default FilteredImage;
