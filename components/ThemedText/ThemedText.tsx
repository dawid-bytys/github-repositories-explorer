import { Text } from 'react-native';
import { styles } from './styles';
import { useColors } from '@/hooks/useColors';
import type { TextProps } from 'react-native';

export function ThemedText(props: TextProps) {
  const colors = useColors();

  return (
    <Text {...props} style={[styles.text, props.style, { color: colors.text }]}>
      {props.children}
    </Text>
  );
}
