import { RED } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
  },
  error: {
    color: RED,
  },
});
