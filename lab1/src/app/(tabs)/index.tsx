import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import { Brand } from '@/constants/brand';
import { NEWS, type NewsItem } from '@/data/content';

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} contentFit="cover" />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.text} numberOfLines={3}>{item.text}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const news = q ? NEWS.filter((n) => `${n.title} ${n.text}`.toLowerCase().includes(q)) : NEWS;

  return (
    <FlatList
      data={news}
      keyExtractor={(n) => n.id}
      renderItem={({ item }) => <NewsCard item={item} />}
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.search}>
          <Ionicons name="search" size={20} color={Brand.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Пошук..."
            placeholderTextColor={Brand.muted}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {query ? <Ionicons name="close-circle" size={20} color={Brand.muted} onPress={() => setQuery('')} /> : null}
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>Нічого не знайдено за запитом «{query}»</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 16 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Brand.border,
    backgroundColor: Brand.card,
  },
  searchInput: { flex: 1, fontSize: 16, color: Brand.text },
  card: {
    backgroundColor: Brand.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Brand.border,
    overflow: 'hidden',
  },
  image: { width: '100%', aspectRatio: 16 / 9, backgroundColor: Brand.border },
  cardBody: { padding: 14, gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Brand.text },
  date: { fontSize: 13, color: Brand.muted },
  text: { fontSize: 14, lineHeight: 20, color: '#3D4756' },
  empty: { textAlign: 'center', color: Brand.muted, marginTop: 24 },
});
