import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { BLUE, WHITE } from '@/constants/colors';
import type { ButtonProps } from './types';

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      testID="button"
      style={[styles.button, props.style, { backgroundColor: props.color ?? BLUE }]}>
      <Text style={[styles.title, props.titleStyle, { color: props.titleColor ?? WHITE }]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
