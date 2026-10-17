import { useSyncExternalStore } from 'react';

import { subscribe } from '@/data/store';

export function useStore(getter) {
  return useSyncExternalStore(subscribe, getter);
}
