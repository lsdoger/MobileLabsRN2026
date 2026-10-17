import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

export default function HeaderButton({ icon, onPress, dot }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={({ pressed }) => [styles.button, pressed && { opacity: 0.6 }]}>
      <Ionicons name={icon} size={22} color={Colors.text} />
      {dot ? <View style={styles.dot} /> : null}
    </Pressable>
  );
}

export function HeaderButtons({ children }) {
  return <View style={styles.row}>{children}</View>;
}

export function TextButton({ title, onPress, color = Colors.blue }) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={styles.textButton}>
      <Text style={[styles.text, { color }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 4 },
  button: { padding: 6 },
  dot: { position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.orange },
  textButton: { paddingHorizontal: 8 },
  text: { fontSize: 16, fontWeight: '600' },
});
