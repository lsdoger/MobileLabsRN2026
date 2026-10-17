import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Badge from '@/components/badge';
import { Colors } from '@/constants/theme';
import { formatDate } from '@/utils/format';

// Висота рядка разом з відступом, потрібна для getItemLayout
export const NEWS_ITEM_HEIGHT = 108;

function NewsItem({ item, onPress }) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={() => onPress(item.id)} style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}>
        <Image source={item.image} style={styles.image} contentFit="cover" transition={150} />
        <View style={styles.body}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.meta}>{item.category} · {formatDate(item.createdAt)}</Text>
          <Badge label={item.status} />
        </View>
      </Pressable>
    </View>
  );
}

export default memo(NewsItem);

const styles = StyleSheet.create({
  wrap: { height: NEWS_ITEM_HEIGHT, paddingBottom: 10 },
  card: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 10,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: { width: 76, height: '100%', borderRadius: 10, backgroundColor: Colors.blueSoft },
  body: { flex: 1, justifyContent: 'space-between' },
  title: { fontSize: 15, fontWeight: '700', color: Colors.text },
  meta: { fontSize: 12, color: Colors.muted },
});
