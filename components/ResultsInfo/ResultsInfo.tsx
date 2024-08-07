import { View } from 'react-native';
import { ThemedText } from '../ThemedText/ThemedText';
import { styles } from './styles';
import type { ResultsInfoProps } from './types';

export function ResultsInfo({ title, titleStyle }: ResultsInfoProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={[styles.title, titleStyle]}>{title}</ThemedText>
    </View>
  );
}
