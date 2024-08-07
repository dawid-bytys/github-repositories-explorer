import { useBoundStore } from '@/store/store';
import { TextInput, Text, View } from 'react-native';
import { ThemedInputProps } from './types';
import { styles } from './styles';
import { BLUE, Colors, RED } from '@/constants/colors';

export function ThemedInput(props: ThemedInputProps) {
  const theme = useBoundStore((state) => state.theme);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[
          styles.input,
          props.style,
          {
            color: Colors[theme].text,
            borderColor: props.error ? RED : props.focused ? BLUE : Colors[theme].border,
            backgroundColor: Colors[theme].inputBackground,
          },
        ]}
        placeholderTextColor={Colors[theme].inputPlaceholder}
      />
      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
}
