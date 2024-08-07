import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/colors';
import { useBoundStore } from '@/store/store';
import { styles } from './styles';
import type { ViewProps } from 'react-native';

export function ThemedContainer(props: ViewProps) {
  const theme = useBoundStore((state) => state.theme);
  const insets = useSafeAreaInsets();

  return (
    <View
      {...props}
      style={[
        styles.flex,
        props.style,
        { backgroundColor: Colors[theme].background, paddingTop: insets.top },
      ]}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      {props.children}
    </View>
  );
}
