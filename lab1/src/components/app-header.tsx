import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand, Student } from '@/constants/brand';

// Логотип з кольорових кіл у стилі емблеми університету
function Logo() {
  const dots = [
    { color: Brand.blue, top: 0, left: 13 },
    { color: Brand.orange, top: 13, left: 26 },
    { color: Brand.green, top: 26, left: 13 },
    { color: Brand.yellow, top: 13, left: 0 },
  ];
  return (
    <View style={styles.logo}>
      {dots.map((d) => (
        <View key={d.color} style={[styles.dot, { backgroundColor: d.color, top: d.top, left: d.left }]} />
      ))}
      <View style={styles.core} />
    </View>
  );
}

export function AppHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <Logo />
      <View style={styles.titles}>
        <Text style={styles.title}>Лабораторна робота 1</Text>
        <Text style={styles.subtitle}>{Student.short}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.settings, pressed && { opacity: 0.7 }]}
        onPress={() => Alert.alert('Налаштування', 'Розділ налаштувань буде додано в наступних лабораторних.')}
        accessibilityLabel="Налаштування">
        <Ionicons name="settings-sharp" size={22} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: Brand.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Brand.border,
  },
  logo: { width: 40, height: 40 },
  dot: { position: 'absolute', width: 14, height: 14, borderRadius: 7 },
  core: { position: 'absolute', top: 11, left: 11, width: 18, height: 18, borderRadius: 9, backgroundColor: Brand.red },
  titles: { flex: 1, alignItems: 'center' },
  title: { fontSize: 17, fontWeight: '700', color: Brand.text },
  subtitle: { fontSize: 12, color: Brand.muted, marginTop: 2 },
  settings: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9AA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
