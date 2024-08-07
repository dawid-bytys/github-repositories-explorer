import { Text } from 'react-native';
import { useBoundStore } from '@/store/store';
import { Colors } from '@/constants/colors';
import { styles } from './styles';
import type { TextProps } from 'react-native';

export function ThemedText(props: TextProps) {
  const theme = useBoundStore((state) => state.theme);

  return (
    <Text {...props} style={[styles.text, props.style, { color: Colors[theme].text }]}>
      {props.children}
    </Text>
  );
}
