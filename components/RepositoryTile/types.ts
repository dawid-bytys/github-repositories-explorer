import { StyleProp, ViewStyle } from 'react-native';

export interface RepositoryTileProps {
  title: string;
  description: string | null;
  stars: number;
  url: string;
}
