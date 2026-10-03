import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';

import NewsCard, { CARD_GAP, CARD_HEIGHT } from '@/components/news-card';
import { Colors } from '@/constants/theme';
import { fetchNewsPage, TOTAL_NEWS } from '@/data/news';

const ITEM_SIZE = CARD_HEIGHT + CARD_GAP;

// Координати елемента без вимірювання розмітки: усі картки однакової висоти
const getItemLayout = (_, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index });
const keyExtractor = (item) => item.id;

export default function NewsScreen() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const loading = useRef(false); // захист від повторного onEndReached під час завантаження

  const load = useCallback(async (nextPage, replace) => {
    if (loading.current) return;
    loading.current = true;
    try {
      const { items, hasMore: more } = await fetchNewsPage(nextPage);
      setNews((prev) => (replace ? items : [...prev, ...items]));
      setPage(nextPage);
      setHasMore(more);
    } finally {
      loading.current = false;
    }
  }, []);

  useEffect(() => {
    setRefreshing(true);
    load(1, true).finally(() => setRefreshing(false));
  }, [load]);

  // Pull-to-Refresh: завантажуємо першу сторінку заново
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load(1, true).finally(() => setRefreshing(false));
  }, [load]);

  // Infinite Scroll: наступна сторінка, коли користувач наближається до кінця
  const onEndReached = useCallback(() => {
    if (!hasMore || loading.current || refreshing) return;
    setLoadingMore(true);
    load(page + 1, false).finally(() => setLoadingMore(false));
  }, [hasMore, refreshing, load, page]);

  const openNews = useCallback((id) => router.push({ pathname: '/[id]', params: { id } }), []);
  const renderItem = useCallback(({ item }) => <NewsCard item={item} onPress={openNews} />, [openNews]);

  return (
    <FlatList
      data={news}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={Separator}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.blue]} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={7}
      ListHeaderComponent={
        news.length ? <Text style={styles.counter}>Завантажено {news.length} з {TOTAL_NEWS} новин</Text> : null
      }
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator style={styles.footer} color={Colors.blue} />
        ) : !hasMore ? (
          <Text style={styles.end}>Усі новини завантажено</Text>
        ) : null
      }
    />
  );
}

function Separator() {
  return <View style={{ height: CARD_GAP }} />;
}

const styles = StyleSheet.create({
  list: { padding: 16, backgroundColor: Colors.background, flexGrow: 1 },
  counter: { marginBottom: 12, fontSize: 13, color: Colors.muted },
  footer: { marginVertical: 16 },
  end: { marginVertical: 16, textAlign: 'center', color: Colors.muted },
});
