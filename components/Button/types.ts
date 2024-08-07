import type { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  color?: string;
  titleColor?: string;
  titleStyle?: StyleProp<TextStyle>;
};
