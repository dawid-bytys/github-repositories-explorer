import { View } from 'react-native';
import { ThemedText } from '../ThemedText/ThemedText';
import { styles } from './styles';
import { useColors } from '@/hooks/useColors';
import type { SettingsItemProps } from './types';

export function SettingsItem({ title, leftContent, rightContent }: SettingsItemProps) {
  const colors = useColors();

  // normally it would be a Pressable but since there is only 'dark mode' option, it is a View
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.settingsItemBackground,
          borderColor: colors.border,
        },
      ]}>
      {leftContent}
      <ThemedText style={styles.title}>{title}</ThemedText>
      {rightContent}
    </View>
  );
}
