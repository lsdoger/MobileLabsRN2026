import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Badge from '@/components/badge';
import { Colors } from '@/constants/theme';
import { deleteNews, getNews } from '@/data/store';
import { useStore } from '@/hooks/use-store';
import { confirm } from '@/utils/confirm';
import { formatDateTime } from '@/utils/format';

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams();
  const news = useStore(getNews).find((n) => n.id === id);

  if (!news) return <Text style={styles.missing}>Новину з ідентифікатором «{id}» не знайдено.</Text>;

  const remove = () =>
    confirm('Видалити новину?', `«${news.title}» буде видалено без можливості відновлення.`, 'Видалити', () => {
      deleteNews(id);
      router.back();
    });

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Image source={news.image} style={styles.image} contentFit="cover" transition={200} />
      <View style={styles.card}>
        <View style={styles.badges}>
          <Badge label={news.category} />
          <Badge label={news.status} />
        </View>
        <Text style={styles.title}>{news.title}</Text>
        <Text style={styles.meta}>Створено {formatDateTime(news.createdAt)} · id: {id}</Text>
        <Text style={styles.text}>{news.text}</Text>
        <Text style={styles.url} numberOfLines={1}>{news.image}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.button, styles.edit, pressed && { opacity: 0.7 }]}
          onPress={() => router.push({ pathname: '/news-form', params: { id } })}>
          <Ionicons name="create-outline" size={18} color={Colors.blue} />
          <Text style={[styles.buttonText, { color: Colors.blue }]}>Редагувати</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.button, styles.delete, pressed && { opacity: 0.7 }]} onPress={remove}>
          <Ionicons name="trash-outline" size={18} color={Colors.red} />
          <Text style={[styles.buttonText, { color: Colors.red }]}>Видалити</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 12, backgroundColor: Colors.background, flexGrow: 1 },
  image: { width: '100%', aspectRatio: 16 / 9, borderRadius: 16, backgroundColor: Colors.blueSoft },
  card: { padding: 16, gap: 10, borderRadius: 16, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  badges: { flexDirection: 'row', gap: 6 },
  title: { fontSize: 21, fontWeight: '800', color: Colors.text },
  meta: { fontSize: 12, color: Colors.muted },
  text: { fontSize: 16, lineHeight: 24, color: '#3D4756' },
  url: { fontSize: 12, color: Colors.blue },
  actions: { flexDirection: 'row', gap: 10 },
  button: { flex: 1, flexDirection: 'row', gap: 6, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  edit: { backgroundColor: Colors.blueSoft },
  delete: { backgroundColor: Colors.redSoft },
  buttonText: { fontSize: 15, fontWeight: '700' },
  missing: { marginTop: 32, textAlign: 'center', color: Colors.muted },
});
