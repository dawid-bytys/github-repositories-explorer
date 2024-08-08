import { useMemo } from 'react';
import { Colors } from '@/constants/colors';
import { useBoundStore } from '@/store/store';

export function useColors() {
  const theme = useBoundStore((state) => state.theme);

  return useMemo(() => Colors[theme], [theme]);
}
