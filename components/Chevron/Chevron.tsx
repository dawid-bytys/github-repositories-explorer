import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useBoundStore } from '@/store/store';
import type { ChevronProps } from './types';

export function Chevron({ progress }: ChevronProps) {
  const theme = useBoundStore((state) => state.theme);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 180]);

    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Entypo name="chevron-with-circle-down" size={24} color={Colors[theme].text} />
    </Animated.View>
  );
}
