import { useEffect, useState } from 'react';
import type { UseBoundStore } from 'zustand';

export function useHydration(boundStore: UseBoundStore<any>) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = boundStore.persist.onHydrate(() => {
      setHydrated(false);
    });

    const unsubFinishHydration = boundStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(boundStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
}
