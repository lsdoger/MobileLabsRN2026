import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import AdminDrawerContent from '@/components/admin-drawer-content';
import AdminHeader from '@/components/admin-header';
import HeaderButton from '@/components/header-button';
import { Colors } from '@/constants/theme';
import { useStore } from '@/hooks/use-store';
import { ALL, getUsersFilter } from '@/data/store';

const icon = (name) => ({ color, size }) => <Ionicons name={name} size={size} color={color} />;

function UsersFilterButton() {
  const filter = useStore(getUsersFilter);
  const active = filter.role !== ALL || filter.status !== ALL;
  return <HeaderButton icon="options-outline" dot={active} onPress={() => router.push('/users-filter')} />;
}

export default function AdminLayout() {
  return (
    <Drawer
      drawerContent={(props) => <AdminDrawerContent {...props} />}
      screenOptions={{
        header: (props) => <AdminHeader {...props} />,
        drawerActiveTintColor: Colors.blue,
        drawerActiveBackgroundColor: Colors.blueSoft,
        drawerInactiveTintColor: Colors.text,
      }}>
      <Drawer.Screen name="index" options={{ title: 'Дашборд', drawerIcon: icon('grid-outline') }} />
      <Drawer.Screen name="news" options={{ title: 'Новини', headerShown: false, drawerIcon: icon('newspaper-outline') }} />
      <Drawer.Screen
        name="users"
        options={{ title: 'Користувачі', drawerIcon: icon('people-outline'), headerRight: () => <UsersFilterButton /> }}
      />
      <Drawer.Screen name="logs" options={{ title: 'Системні логи', drawerIcon: icon('document-text-outline') }} />
    </Drawer>
  );
}
