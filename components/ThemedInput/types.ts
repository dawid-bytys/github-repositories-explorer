import type { TextInputProps } from 'react-native';

export type ThemedInputProps = TextInputProps & {
  focused: boolean;
  error?: string;
};
