import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect } from 'expo-router';
import { Drawer, DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Student } from '@/constants/theme';
import { useAuth } from '@/context/auth';

// Вміст бічного меню: користувач, пункти меню та кнопка «Вийти»
function DrawerContent(props) {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color="#fff" />
          </View>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.student}>{Student}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable
        onPress={logout}
        style={({ pressed }) => [styles.logout, { marginBottom: insets.bottom + 12 }, pressed && { opacity: 0.7 }]}>
        <Ionicons name="log-out-outline" size={22} color={Colors.red} />
        <Text style={styles.logoutText}>Вийти</Text>
      </Pressable>
    </View>
  );
}

// Захищена група: без авторизації перенаправляємо на екран входу
export default function DrawerLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Redirect href="/login" />;

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTintColor: Colors.text,
        headerTitleStyle: { fontWeight: '700' },
        drawerActiveTintColor: Colors.blue,
        drawerActiveBackgroundColor: Colors.blueSoft,
      }}>
      <Drawer.Screen
        name="(news)"
        options={{
          title: 'Новини',
          drawerLabel: 'Новини',
          drawerIcon: ({ color, size }) => <Ionicons name="newspaper-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="faq"
        options={{
          title: 'Довідковий центр',
          drawerLabel: 'Довідковий центр',
          drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  profile: { padding: 16, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: { marginTop: 10, fontSize: 16, fontWeight: '700', color: Colors.text },
  student: { fontSize: 12, color: Colors.muted },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FDECEC',
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: Colors.red },
});
