import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import LogItem from '@/components/log-item';
import { Colors } from '@/constants/theme';
import { getLogs, getNews, getUsers } from '@/data/store';

function calcStats() {
  const news = getNews();
  const users = getUsers();
  const logs = getLogs();
  const count = (list, key, value) => list.filter((x) => x[key] === value).length;
  return {
    news: news.length,
    published: count(news, 'status', 'Опубліковано'),
    drafts: count(news, 'status', 'Чернетка'),
    review: count(news, 'status', 'На перевірці'),
    users: users.length,
    active: count(users, 'status', 'Активний'),
    blocked: count(users, 'status', 'Заблокований'),
    logs: logs.length,
    lastLogs: logs.slice(0, 5),
    updatedAt: new Date().toLocaleTimeString('uk-UA'),
  };
}

function StatCard({ icon, color, title, value, lines }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={[styles.icon, { backgroundColor: color }]}>
          <Ionicons name={icon} size={22} color="#fff" />
        </View>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      {lines.map((line) => (
        <Text key={line} style={styles.line}>{line}</Text>
      ))}
    </View>
  );
}

export default function DashboardScreen() {
  const [stats, setStats] = useState(calcStats);

  // Дані перераховуються щоразу, коли екран отримує фокус
  useFocusEffect(
    useCallback(() => {
      setStats(calcStats());
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.updated}>Оновлено о {stats.updatedAt}</Text>
      <StatCard
        icon="newspaper"
        color={Colors.blue}
        title="Новини"
        value={stats.news}
        lines={[`Опубліковано: ${stats.published}`, `Чернетки: ${stats.drafts}`, `На перевірці: ${stats.review}`]}
      />
      <StatCard
        icon="people"
        color={Colors.purple}
        title="Користувачі"
        value={stats.users}
        lines={[`Активні: ${stats.active}`, `Заблоковані: ${stats.blocked}`]}
      />
      <StatCard icon="document-text" color={Colors.orange} title="Системні логи" value={stats.logs} lines={['Записів у журналі аудиту']} />

      <Text style={styles.section}>Останні дії</Text>
      <View>
        {stats.lastLogs.map((log) => (
          <LogItem key={log.id} item={log} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 12, backgroundColor: Colors.background, flexGrow: 1 },
  updated: { fontSize: 12, color: Colors.muted },
  card: { padding: 16, gap: 4, borderRadius: 16, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  icon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  value: { fontSize: 32, fontWeight: '800', color: Colors.text },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  line: { fontSize: 13, color: Colors.muted },
  section: { marginTop: 8, fontSize: 16, fontWeight: '700', color: Colors.text },
});
