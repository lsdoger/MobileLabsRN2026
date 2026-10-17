import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Student } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import { initials } from '@/utils/format';

export default function AdminDrawerContent(props) {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials(user?.name ?? 'A')}</Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.role}>
            <Ionicons name="shield-checkmark" size={12} color={Colors.blue} />
            <Text style={styles.roleText}>Адміністратор</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ paddingBottom: insets.bottom + 12 }}>
        <Pressable onPress={logout} style={({ pressed }) => [styles.logout, pressed && { opacity: 0.7 }]}>
          <Ionicons name="log-out-outline" size={22} color={Colors.red} />
          <Text style={styles.logoutText}>Вийти</Text>
        </Pressable>
        <Text style={styles.student}>{Student}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: { padding: 16, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: '800' },
  name: { marginTop: 10, fontSize: 17, fontWeight: '700', color: Colors.text },
  email: { marginTop: 2, fontSize: 13, color: Colors.muted },
  role: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    backgroundColor: Colors.blueSoft,
  },
  roleText: { fontSize: 11, fontWeight: '700', color: Colors.blue },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: Colors.redSoft,
  },
  logoutText: { fontSize: 16, fontWeight: '700', color: Colors.red },
  student: { marginTop: 8, textAlign: 'center', fontSize: 11, color: Colors.muted },
});
