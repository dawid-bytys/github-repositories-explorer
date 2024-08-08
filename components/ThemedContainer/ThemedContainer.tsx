import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useBoundStore } from '@/store/store';
import { styles } from './styles';
import { useColors } from '@/hooks/useColors';
import type { ViewProps } from 'react-native';

export function ThemedContainer(props: ViewProps) {
  const theme = useBoundStore((state) => state.theme);
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        styles.flex,
        props.style,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      {props.children}
    </View>
  );
}
