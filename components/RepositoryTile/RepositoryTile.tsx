import { memo } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { styles } from './styles';
import { ThemedText } from '../ThemedText/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { GOLD } from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import type { RepositoryTileProps } from './types';

export const RepositoryTile = memo(({ title, description, stars, url }: RepositoryTileProps) => {
  const colors = useColors();

  return (
    <Pressable
      style={[styles.container, { backgroundColor: colors.repositoryBackground }]}
      onPress={() => Linking.openURL(url)}>
      <View style={styles.upperContainer}>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>{title}</ThemedText>
        </View>
        <View style={styles.starContainer}>
          <ThemedText style={styles.stars}>{stars}</ThemedText>
          <FontAwesome name="star" size={15} color={GOLD} />
        </View>
      </View>
      {description && <ThemedText style={styles.description}>{description}</ThemedText>}
    </Pressable>
  );
});
