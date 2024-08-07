import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createThemeSlice } from './slices/theme';
import type { ThemeSlice } from './slices/theme';

export const useBoundStore = create<ThemeSlice>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
    }),
    {
      name: 'bound-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
