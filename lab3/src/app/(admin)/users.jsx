import { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserItem, { USER_ITEM_HEIGHT } from '@/components/user-item';
import { Colors } from '@/constants/theme';
import { ALL, getUsers, getUsersFilter, toggleUserStatus } from '@/data/store';
import { useStore } from '@/hooks/use-store';
import { confirm } from '@/utils/confirm';

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: USER_ITEM_HEIGHT, offset: USER_ITEM_HEIGHT * index, index });
const keyExtractor = (item) => item.id;

export default function UsersScreen() {
  const users = useStore(getUsers);
  const filter = useStore(getUsersFilter);
  const insets = useSafeAreaInsets();

  const data = useMemo(
    () => users.filter((u) => (filter.role === ALL || u.role === filter.role) && (filter.status === ALL || u.status === filter.status)),
    [users, filter]
  );
  const blocked = users.filter((u) => u.status === 'Заблокований').length;

  const toggle = useCallback((user) => {
    const block = user.status === 'Активний';
    confirm(
      block ? 'Заблокувати користувача?' : 'Розблокувати користувача?',
      `${user.name} (${user.email})`,
      block ? 'Заблокувати' : 'Розблокувати',
      () => toggleUserStatus(user.id)
    );
  }, []);
  const renderItem = useCallback(({ item }) => <UserItem item={item} onToggle={toggle} />, [toggle]);

  return (
    <View style={styles.page}>
      <View style={styles.bar}>
        <Text style={styles.counter}>
          Показано {data.length} з {users.length} · заблоковано {blocked}
        </Text>
        <Text style={styles.filter} numberOfLines={1}>
          {filter.role} · {filter.status}
        </Text>
      </View>
      <VirtualizedList
        data={data}
        getItem={getItem}
        getItemCount={getItemCount}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={9}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        removeClippedSubviews
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
        ListEmptyComponent={<Text style={styles.empty}>Користувачів за цим фільтром немає</Text>}
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
