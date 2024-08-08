import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';
import { useColors } from '@/hooks/useColors';

export function Loading() {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.spinner} />
    </View>
  );
}
