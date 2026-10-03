import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { getNewsById } from '@/data/news';

// Динамічний маршрут: id новини приходить з адреси /[id]
export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams();
  const news = getNewsById(id);

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}>
        <Ionicons name="arrow-back" size={20} color={Colors.blue} />
        <Text style={styles.backText}>До списку новин</Text>
      </Pressable>

      {news ? (
        <View style={styles.card}>
          <View style={[styles.badge, { backgroundColor: news.color }]}>
            <Text style={styles.badgeText}>{news.category}</Text>
          </View>
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.meta}>
            {news.date} · ідентифікатор новини: {id}
          </Text>
          {news.body.map((p, i) => (
            <Text key={i} style={styles.paragraph}>{p}</Text>
          ))}
        </View>
      ) : (
        <Text style={styles.missing}>Новину з ідентифікатором «{id}» не знайдено.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 12, backgroundColor: Colors.background, flexGrow: 1 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 6 },
  backText: { fontSize: 15, fontWeight: '600', color: Colors.blue },
  card: {
    padding: 18,
    gap: 10,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '800', color: Colors.text },
  meta: { fontSize: 13, color: Colors.muted },
  paragraph: { fontSize: 16, lineHeight: 24, color: '#3D4756' },
  missing: { textAlign: 'center', color: Colors.muted, marginTop: 24 },
});
