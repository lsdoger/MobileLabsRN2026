import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { Brand } from '@/constants/brand';
import { PHOTOS } from '@/data/content';

type Mode = 'grid' | 'list';

export default function GalleryScreen() {
  const [mode, setMode] = useState<Mode>('grid');
  const grid = mode === 'grid';

  const ModeButton = ({ value, icon }: { value: Mode; icon: keyof typeof Ionicons.glyphMap }) => (
    <Pressable
      onPress={() => setMode(value)}
      style={[styles.modeBtn, mode === value && styles.modeBtnOn]}
      accessibilityLabel={value === 'grid' ? 'Сітка' : 'Список'}>
      <Ionicons name={icon} size={20} color={mode === value ? '#fff' : Brand.blue} />
    </Pressable>
  );

  return (
    <FlatList
      key={mode} // зміна кількості колонок потребує нового списку
      data={PHOTOS}
      numColumns={grid ? 2 : 1}
      keyExtractor={(p) => p.id}
      contentContainerStyle={styles.list}
      columnWrapperStyle={grid ? styles.row : undefined}
      ListHeaderComponent={
        <View style={styles.head}>
          <Text style={styles.title}>Фотогалерея</Text>
          <View style={styles.modes}>
            <ModeButton value="grid" icon="grid" />
            <ModeButton value="list" icon="list" />
          </View>
        </View>
      }
      renderItem={({ item }) =>
        grid ? (
          <Image source={item.image} style={styles.tile} contentFit="cover" />
        ) : (
          <View style={styles.listItem}>
            <Image source={item.image} style={styles.thumb} contentFit="cover" />
            <Text style={styles.caption}>{item.caption}</Text>
            <Ionicons name="chevron-forward" size={18} color={Brand.muted} />
          </View>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  row: { gap: 12 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '800', color: Brand.text },
  modes: { flexDirection: 'row', gap: 6 },
  modeBtn: { width: 38, height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  modeBtnOn: { backgroundColor: Brand.blue },
  tile: { flex: 1, aspectRatio: 4 / 3, borderRadius: 10, backgroundColor: Brand.border },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: Brand.card,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  thumb: { width: 96, height: 72, borderRadius: 8, backgroundColor: Brand.border },
  caption: { flex: 1, fontSize: 16, fontWeight: '600', color: Brand.text },
});
