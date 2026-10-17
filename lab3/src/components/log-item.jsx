import Ionicons from '@expo/vector-icons/Ionicons';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, LOG_ACTIONS } from '@/constants/theme';
import { formatDateTime } from '@/utils/format';

export const LOG_ITEM_HEIGHT = 84;

function LogItem({ item }) {
  const action = LOG_ACTIONS[item.action];
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={[styles.icon, { backgroundColor: action.color }]}>
          <Ionicons name={action.icon} size={20} color="#fff" />
        </View>
        <View style={styles.body}>
          <View style={styles.top}>
            <Text style={styles.action} numberOfLines={1}>{action.label}</Text>
            <Text style={styles.date}>{formatDateTime(item.date)}</Text>
          </View>
          <Text style={styles.details} numberOfLines={1}>{item.details}</Text>
          <Text style={styles.user} numberOfLines={1}>{item.user}</Text>
        </View>
      </View>
    </View>
  );
}

export default memo(LogItem);

const styles = StyleSheet.create({
  wrap: { height: LOG_ITEM_HEIGHT, paddingBottom: 8 },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  icon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, gap: 2 },
  top: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  action: { flexShrink: 1, fontSize: 14, fontWeight: '700', color: Colors.text },
  date: { flexShrink: 0, fontSize: 11, color: Colors.muted },
  details: { fontSize: 13, color: Colors.text },
  user: { fontSize: 12, color: Colors.muted },
});
