import { memo } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { styles } from './styles';
import { ThemedText } from '../ThemedText/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { Colors, GOLD } from '@/constants/colors';
import { useBoundStore } from '@/store/store';
import type { RepositoryTileProps } from './types';

export const RepositoryTile = memo(({ title, description, stars, url }: RepositoryTileProps) => {
  const theme = useBoundStore((state) => state.theme);

  return (
    <Pressable
      style={[styles.container, { backgroundColor: Colors[theme].repositoryBackground }]}
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
