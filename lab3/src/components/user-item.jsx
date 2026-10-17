import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Badge from '@/components/badge';
import { Colors } from '@/constants/theme';
import { initials } from '@/utils/format';

export const USER_ITEM_HEIGHT = 92;

function UserItem({ item, onToggle }) {
  const blocked = item.status === 'Заблокований';
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={[styles.avatar, blocked && { backgroundColor: Colors.muted }]}>
          <Text style={styles.avatarText}>{initials(item.name)}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
          <View style={styles.badges}>
            <Badge label={item.role} />
            <Badge label={item.status} />
          </View>
        </View>
        <Pressable
          onPress={() => onToggle(item)}
          style={({ pressed }) => [styles.button, blocked ? styles.unblock : styles.block, pressed && { opacity: 0.7 }]}>
          <Ionicons name={blocked ? 'lock-open-outline' : 'lock-closed-outline'} size={20} color={blocked ? Colors.green : Colors.red} />
        </Pressable>
      </View>
    </View>
  );
}

export default memo(UserItem);

const styles = StyleSheet.create({
  wrap: { height: USER_ITEM_HEIGHT, paddingBottom: 10 },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '800' },
  body: { flex: 1, gap: 3 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.text },
  email: { fontSize: 12, color: Colors.muted },
  badges: { flexDirection: 'row', gap: 6 },
  button: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  block: { backgroundColor: Colors.redSoft },
  unblock: { backgroundColor: Colors.greenSoft },
});
