import { StyleSheet, Text, View } from 'react-native';

import { Colors, STATUS_COLORS } from '@/constants/theme';

export default function Badge({ label }) {
  const c = STATUS_COLORS[label] ?? { color: Colors.blue, background: Colors.blueSoft };
  return (
    <View style={[styles.badge, { backgroundColor: c.background }]}>
      <Text style={[styles.text, { color: c.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99 },
  text: { fontSize: 11, fontWeight: '700' },
});
