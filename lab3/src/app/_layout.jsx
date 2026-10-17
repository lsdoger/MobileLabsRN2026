import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Colors } from '@/constants/theme';
import { AuthProvider, useAuth } from '@/context/auth';

const sheet = {
  presentation: 'formSheet',
  sheetAllowedDetents: [0.6, 0.9],
  sheetInitialDetentIndex: 0,
  sheetGrabberVisible: true,
  sheetCornerRadius: 24,
  headerShown: false,
  contentStyle: { backgroundColor: Colors.card },
};

function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(admin)" />
        <Stack.Screen
          name="news-form"
          options={{ presentation: 'modal', headerShown: true, headerTintColor: Colors.blue, headerTitleStyle: { color: Colors.text } }}
        />
        <Stack.Screen name="news-filter" options={sheet} />
        <Stack.Screen name="users-filter" options={sheet} />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
