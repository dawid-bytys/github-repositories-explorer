import { TextInput, Text, View } from 'react-native';
import { ThemedInputProps } from './types';
import { styles } from './styles';
import { BLUE, RED } from '@/constants/colors';
import { useColors } from '@/hooks/useColors';

export function ThemedInput(props: ThemedInputProps) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[
          styles.input,
          props.style,
          {
            color: colors.text,
            borderColor: props.error ? RED : props.focused ? BLUE : colors.border,
            backgroundColor: colors.inputBackground,
          },
        ]}
        placeholderTextColor={colors.inputPlaceholder}
      />
      {props.error && <Text style={styles.error}>{props.error}</Text>}
    </View>
  );
}
