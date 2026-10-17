import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LogItem, { LOG_ITEM_HEIGHT } from '@/components/log-item';
import { Colors } from '@/constants/theme';
import { getLogs } from '@/data/store';
import { useStore } from '@/hooks/use-store';

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: LOG_ITEM_HEIGHT, offset: LOG_ITEM_HEIGHT * index, index });
const keyExtractor = (item) => item.id;
const renderItem = ({ item }) => <LogItem item={item} />;

export default function LogsScreen() {
  const logs = useStore(getLogs);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.page}>
      <Text style={styles.counter}>Записів у журналі: {logs.length} · нові зверху</Text>
      <VirtualizedList
        data={logs}
        getItem={getItem}
        getItemCount={getItemCount}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={12}
        updateCellsBatchingPeriod={50}
        windowSize={7}
        removeClippedSubviews
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: Colors.background },
  counter: { paddingHorizontal: 16, paddingTop: 12, fontSize: 13, color: Colors.muted },
});
