import { router } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NewsItem, { NEWS_ITEM_HEIGHT } from '@/components/news-item';
import { Colors } from '@/constants/theme';
import { ALL, getNews, getNewsFilter } from '@/data/store';
import { useStore } from '@/hooks/use-store';

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: NEWS_ITEM_HEIGHT, offset: NEWS_ITEM_HEIGHT * index, index });
const keyExtractor = (item) => item.id;

export default function NewsScreen() {
  const news = useStore(getNews);
  const filter = useStore(getNewsFilter);
  const insets = useSafeAreaInsets();

  const data = useMemo(
    () =>
      news.filter(
        (n) => (filter.category === ALL || n.category === filter.category) && (filter.status === ALL || n.status === filter.status)
      ),
    [news, filter]
  );

  const open = useCallback((id) => router.push({ pathname: '/news/[id]', params: { id } }), []);
  const renderItem = useCallback(({ item }) => <NewsItem item={item} onPress={open} />, [open]);

  return (
    <View style={styles.page}>
      <View style={styles.bar}>
        <Text style={styles.counter}>Показано {data.length} з {news.length}</Text>
        <Text style={styles.filter} numberOfLines={1}>
          {filter.category} · {filter.status}
        </Text>
      </View>
      <VirtualizedList
        data={data}
        getItem={getItem}
        getItemCount={getItemCount}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        removeClippedSubviews
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
        ListEmptyComponent={<Text style={styles.empty}>Новин за цим фільтром немає</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: Colors.background },
  bar: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingHorizontal: 16, paddingTop: 12 },
  counter: { fontSize: 13, color: Colors.muted },
  filter: { flexShrink: 1, fontSize: 13, fontWeight: '600', color: Colors.blue },
  empty: { marginTop: 32, textAlign: 'center', color: Colors.muted },
});
