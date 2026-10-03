import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { Brand } from '@/constants/brand';

type IconName = keyof typeof Ionicons.glyphMap;

const tabIcon = (active: IconName, inactive: IconName) =>
  ({ color, focused }: { color: ColorValue; focused: boolean }) => (
    <Ionicons name={focused ? active : inactive} size={24} color={color} />
  );

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        header: () => <AppHeader />,
        tabBarActiveTintColor: Brand.blue,
        tabBarInactiveTintColor: Brand.muted,
        tabBarLabelStyle: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: Brand.card,
          borderTopColor: Brand.border,
          height: 62 + insets.bottom,
          paddingTop: 2,
          paddingBottom: insets.bottom + 2,
        },
        sceneStyle: { backgroundColor: Brand.background },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Головна', tabBarIcon: tabIcon('home', 'home-outline') }} />
      <Tabs.Screen name="gallery" options={{ title: 'Галерея', tabBarIcon: tabIcon('images', 'images-outline') }} />
      <Tabs.Screen name="profile" options={{ title: 'Профіль', tabBarIcon: tabIcon('person', 'person-outline') }} />
    </Tabs>
  );
}
