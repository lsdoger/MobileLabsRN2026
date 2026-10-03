import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

// Фіксована висота картки потрібна для getItemLayout у FlatList
export const CARD_HEIGHT = 120;
export const CARD_GAP = 12;

// React.memo: картка перемальовується лише тоді, коли змінились її props
function NewsCard({ item, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(item.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.stripe, { backgroundColor: item.color }]} />
      <View style={styles.body}>
        <View style={styles.meta}>
          <Text style={[styles.category, { color: item.color }]}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.summary} numberOfLines={1}>{item.summary}</Text>
      </View>
    </Pressable>
  );
}

export default memo(NewsCard);

const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.7 },
  stripe: { width: 6 },
  body: { flex: 1, padding: 12, gap: 4 },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  category: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  date: { fontSize: 12, color: Colors.muted },
  title: { fontSize: 16, fontWeight: '700', color: Colors.text },
  summary: { fontSize: 13, color: Colors.muted },
});
