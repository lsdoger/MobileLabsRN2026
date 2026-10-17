import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Chips from '@/components/chips';
import { TextButton } from '@/components/header-button';
import { Colors, NEWS_CATEGORIES, NEWS_STATUSES } from '@/constants/theme';
import { createNews, getNewsById, updateNews } from '@/data/store';

const EMPTY = { title: '', category: NEWS_CATEGORIES[0], status: NEWS_STATUSES[1], image: '', text: '' };

// Модальне вікно створення та редагування новини (presentation: 'modal')
export default function NewsFormScreen() {
  const { id } = useLocalSearchParams();
  const editing = id ? getNewsById(id) : null;
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState(() => {
    if (!editing) return EMPTY;
    const { title, category, status, image, text } = editing;
    return { title, category, status, image, text };
  });
  const [error, setError] = useState('');

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const save = () => {
    const data = { ...form, title: form.title.trim(), image: form.image.trim(), text: form.text.trim() };
    if (data.title.length < 5) return setError('Заголовок має містити щонайменше 5 символів');
    if (!/^https?:\/\/\S+$/.test(data.image)) return setError('Вкажіть посилання на зображення (http/https)');
    if (data.text.length < 10) return setError('Текст новини занадто короткий');
    if (editing) updateNews(editing.id, data);
    else createNews(data);
    router.back();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen
        options={{
          title: editing ? 'Редагування новини' : 'Нова новина',
          headerLeft: () => <TextButton title="Скасувати" onPress={() => router.back()} />,
          headerRight: () => <TextButton title="Зберегти" onPress={save} />,
        }}
      />
      <ScrollView contentContainerStyle={[styles.page, { paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Заголовок</Text>
        <TextInput value={form.title} onChangeText={set('title')} placeholder="Заголовок новини" style={styles.input} placeholderTextColor={Colors.muted} />

        <Text style={styles.label}>Категорія</Text>
        <Chips options={NEWS_CATEGORIES} value={form.category} onChange={set('category')} />

        <Text style={styles.label}>Статус</Text>
        <Chips options={NEWS_STATUSES} value={form.status} onChange={set('status')} />

        <Text style={styles.label}>Посилання на зображення (URL)</Text>
        <TextInput
          value={form.image}
          onChangeText={set('image')}
          placeholder="https://picsum.photos/800/450"
          autoCapitalize="none"
          keyboardType="url"
          style={styles.input}
          placeholderTextColor={Colors.muted}
        />

        <Text style={styles.label}>Текст новини</Text>
        <TextInput
          value={form.text}
          onChangeText={set('text')}
          placeholder="Текст новини"
          multiline
          style={[styles.input, styles.textarea]}
          placeholderTextColor={Colors.muted}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]} onPress={save}>
          <Text style={styles.buttonText}>{editing ? 'Зберегти зміни' : 'Створити новину'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 8, backgroundColor: Colors.background, flexGrow: 1 },
  label: { marginTop: 8, fontSize: 13, fontWeight: '700', color: Colors.text },
  input: {
    minHeight: 46,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    fontSize: 16,
    color: Colors.text,
  },
  textarea: { minHeight: 120, paddingTop: 12, textAlignVertical: 'top' },
  error: { marginTop: 8, color: Colors.red, fontSize: 13 },
  button: { marginTop: 16, height: 48, borderRadius: 12, backgroundColor: Colors.blue, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
