import { View } from 'react-native';
import { ThemedText } from '../ThemedText/ThemedText';
import { styles } from './styles';
import { useBoundStore } from '@/store/store';
import { Colors } from '@/constants/colors';
import type { SettingsItemProps } from './types';

export function SettingsItem({ title, leftContent, rightContent }: SettingsItemProps) {
  const theme = useBoundStore((state) => state.theme);

  // normally it would be a Pressable but since there is only 'dark mode' option, it is a View
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme].settingsItemBackground,
          borderColor: Colors[theme].border,
        },
      ]}>
      {leftContent}
      <ThemedText style={styles.title}>{title}</ThemedText>
      {rightContent}
    </View>
  );
}
