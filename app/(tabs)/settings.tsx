import { Switch, View, StyleSheet } from 'react-native';
import { SettingsItem } from '@/components/SettingsItem/SettingsItem';
import { ThemedContainer } from '@/components/ThemedContainer/ThemedContainer';
import { BLUE, GREY } from '@/constants/colors';
import { useBoundStore } from '@/store/store';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

export default function SettingsScreen() {
  const theme = useBoundStore((state) => state.theme);
  const colors = useColors();
  const toggleTheme = useBoundStore((state) => state.toggleTheme);

  return (
    <ThemedContainer>
      <View style={styles.container}>
        <SettingsItem
          title="Dark mode"
          leftContent={<Feather name="moon" size={28} color={colors.settingsIcon} />}
          rightContent={
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{
                true: BLUE,
                false: GREY,
              }}
            />
          }
        />
      </View>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
});
