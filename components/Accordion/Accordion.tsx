import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ThemedText } from '../ThemedText/ThemedText';
import { styles } from './styles';
import { Colors } from '@/constants/colors';
import { useBoundStore } from '@/store/store';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Chevron } from '../Chevron/Chevron';
import type { AccordionProps } from './types';

export function Accordion({ title, children }: AccordionProps) {
  const theme = useBoundStore((state) => state.theme);
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isExpanded ? 1 : 0, { duration: 200 });
  }, [isExpanded, progress]);

  return (
    <View
      testID="accordion"
      style={[styles.container, { backgroundColor: Colors[theme].accordionBackground }]}>
      <Pressable
        testID="accordion-button"
        onPress={() => setIsExpanded((prevState) => !prevState)}
        style={styles.button}>
        <ThemedText>{title}</ThemedText>
        <Chevron progress={progress} />
      </Pressable>
      {isExpanded && (
        <View
          style={[
            styles.expandedContainer,
            { backgroundColor: Colors[theme].accordionBackground },
          ]}>
          {children}
        </View>
      )}
    </View>
  );
}
