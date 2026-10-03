import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { FAQ_SECTIONS } from '@/data/faq';

// Довідковий центр: питання згруповані за темами в SectionList
export default function FaqScreen() {
  const [openId, setOpenId] = useState(null);

  return (
    <SectionList
      sections={FAQ_SECTIONS}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled
      contentContainerStyle={styles.list}
      renderSectionHeader={({ section }) => (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
          <Text style={styles.headerCount}>{section.data.length}</Text>
        </View>
      )}
      renderItem={({ item }) => {
        const open = openId === item.id;
        return (
          <Pressable onPress={() => setOpenId(open ? null : item.id)} style={styles.item}>
            <View style={styles.questionRow}>
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.muted} />
            </View>
            {open ? <Text style={styles.answer}>{item.answer}</Text> : null}
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 24, backgroundColor: Colors.background, flexGrow: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.blueSoft,
  },
  headerText: { fontSize: 14, fontWeight: '800', color: Colors.blue, textTransform: 'uppercase' },
  headerCount: { fontSize: 13, fontWeight: '700', color: Colors.blue },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  questionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  question: { flex: 1, fontSize: 16, fontWeight: '600', color: Colors.text },
  answer: { fontSize: 15, lineHeight: 22, color: Colors.muted },
});
