import { Colors } from '@/constants/colors';
import { useBoundStore } from '@/store/store';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';

export function Loading() {
  const theme = useBoundStore((state) => state.theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={Colors[theme].spinner} />
    </View>
  );
}
