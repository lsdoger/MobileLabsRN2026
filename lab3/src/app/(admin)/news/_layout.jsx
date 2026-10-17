import { router, Stack } from 'expo-router';

import AdminHeader from '@/components/admin-header';
import HeaderButton, { HeaderButtons } from '@/components/header-button';
import { ALL, getNewsFilter } from '@/data/store';
import { useStore } from '@/hooks/use-store';

function NewsActions() {
  const filter = useStore(getNewsFilter);
  const active = filter.category !== ALL || filter.status !== ALL;
  return (
    <HeaderButtons>
      <HeaderButton icon="options-outline" dot={active} onPress={() => router.push('/news-filter')} />
      <HeaderButton icon="add" onPress={() => router.push('/news-form')} />
    </HeaderButtons>
  );
}

export default function NewsLayout() {
  return (
    <Stack screenOptions={{ header: (props) => <AdminHeader {...props} /> }}>
      <Stack.Screen name="index" options={{ title: 'Новини', headerRight: () => <NewsActions /> }} />
      <Stack.Screen name="[id]" options={{ title: 'Перегляд новини' }} />
    </Stack>
  );
}
