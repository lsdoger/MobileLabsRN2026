import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Chips from '@/components/chips';
import { Colors } from '@/constants/theme';

// Спільний вміст панелей фільтрації (presentation: 'formSheet')
export default function FilterSheet({ title, groups, onReset, onApply }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title}>{title}</Text>
      {groups.map((g) => (
        <View key={g.label} style={styles.group}>
          <Text style={styles.label}>{g.label}</Text>
          <Chips options={g.options} value={g.value} onChange={g.onChange} />
        </View>
      ))}
      <View style={styles.actions}>
        <Pressable style={({ pressed }) => [styles.button, styles.reset, pressed && { opacity: 0.7 }]} onPress={onReset}>
          <Text style={[styles.buttonText, { color: Colors.text }]}>Скинути</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, styles.apply, pressed && { opacity: 0.8 }]}
          onPress={() => {
            onApply();
            router.back();
          }}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Застосувати</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20, paddingTop: 28, gap: 16 },
  title: { fontSize: 20, fontWeight: '800', color: Colors.text },
  group: { gap: 8 },
  label: { fontSize: 13, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase' },
  actions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  button: { flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  reset: { backgroundColor: '#EEF1F5' },
  apply: { backgroundColor: Colors.blue },
  buttonText: { fontSize: 16, fontWeight: '700' },
});
