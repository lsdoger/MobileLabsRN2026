import { Stack } from 'expo-router';

// Вкладений Stack усередині Drawer: заголовок показує Drawer, тому свій вимикаємо
export default function NewsLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
