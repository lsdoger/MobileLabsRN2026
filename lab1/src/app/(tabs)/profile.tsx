import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { Brand, Student } from '@/constants/brand';

interface Profile {
  fullName: string;
  email: string;
  group: string;
  notifications: boolean;
}

//
const webSwitchColor = { activeThumbColor: Brand.blue };

const INITIAL: Profile = { fullName: Student.fullName, email: Student.email, group: Student.group, notifications: true };

function Field({ label, value, onChange, keyboard }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  keyboard?: 'default' | 'email-address';
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        keyboardType={keyboard ?? 'default'}
        autoCapitalize={keyboard === 'email-address' ? 'none' : 'words'}
        placeholder={keyboard === 'email-address' ? 'name@student.ztu.edu.ua' : ''}
        placeholderTextColor={Brand.muted}
        style={styles.input}
      />
    </View>
  );
}

export default function ProfileScreen() {
  const [saved, setSaved] = useState<Profile>(INITIAL);
  const [draft, setDraft] = useState<Profile>(INITIAL);
  const set = <K extends keyof Profile>(key: K) => (value: Profile[K]) => setDraft((p) => ({ ...p, [key]: value }));
  const changed = JSON.stringify(saved) !== JSON.stringify(draft);

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.banner}>
        <View style={styles.actions}>
          <Pressable style={[styles.action, !changed && styles.disabled]} disabled={!changed} onPress={() => setDraft(saved)} accessibilityLabel="Скасувати">
            <Ionicons name="close" size={20} color="#fff" />
          </Pressable>
          <Pressable
            style={[styles.action, !changed && styles.disabled]}
            disabled={!changed}
            onPress={() => { setSaved(draft); Alert.alert('Профіль', 'Зміни збережено'); }}
            accessibilityLabel="Зберегти">
            <Ionicons name="checkmark" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
      <View style={styles.avatar}>
        <Ionicons name="person" size={72} color="#5B6472" />
      </View>

      <View style={styles.body}>
        <Field label="ПІБ" value={draft.fullName} onChange={set('fullName')} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>КОНТАКТИ</Text>
          <Field label="Email" value={draft.email} onChange={set('email')} keyboard="email-address" />
          <Field label="Група" value={draft.group} onChange={set('group')} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>НАЛАШТУВАННЯ</Text>
          <View style={styles.switchRow}>
            <Ionicons name="notifications-outline" size={20} color={Brand.blue} />
            <Text style={styles.switchLabel}>Сповіщення</Text>
            <Switch
              value={draft.notifications}
              onValueChange={set('notifications')}
              trackColor={{ true: '#8FB0E8', false: Brand.border }}
              thumbColor={draft.notifications ? Brand.blue : '#f4f3f4'}
              {...webSwitchColor}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const AVATAR = 120;

const styles = StyleSheet.create({
  page: { paddingBottom: 24 },
  banner: { height: 120, backgroundColor: Brand.blue, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, padding: 12 },
  action: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.45 },
  avatar: {
    alignSelf: 'center',
    marginTop: -AVATAR / 2,
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: '#E8ECF2',
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { padding: 16, gap: 16 },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: Brand.text },
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Brand.border,
    backgroundColor: '#F8FAFC',
    fontSize: 16,
    color: Brand.text,
  },
  card: {
    backgroundColor: Brand.card,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: Brand.border,
  },
  cardTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.6, color: Brand.muted },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  switchLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: Brand.text },
});
