import { Appearance } from 'react-native';
import type { StateCreator } from 'zustand';

export type ThemeSlice = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (set) => ({
  theme: Appearance.getColorScheme() ?? 'light',
  toggleTheme: () => {
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }));
  },
});
