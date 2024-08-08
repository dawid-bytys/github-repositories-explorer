import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import type { ChevronProps } from './types';

export function Chevron({ progress }: ChevronProps) {
  const colors = useColors();

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 180]);

    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Entypo name="chevron-with-circle-down" size={24} color={colors.text} />
    </Animated.View>
  );
}
