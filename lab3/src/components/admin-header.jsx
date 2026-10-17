import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerToggleButton } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

// Власний хедер для screenOptions.header: у Drawer показує кнопку меню, у Stack - кнопку «Назад»
export default function AdminHeader({ navigation, options, route, back }) {
  const insets = useSafeAreaInsets();
  const title = options.title ?? route.name;

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.side}>
        {back ? (
          <Pressable onPress={navigation.goBack} hitSlop={8} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={Colors.blue} />
          </Pressable>
        ) : (
          <DrawerToggleButton tintColor={Colors.text} />
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={[styles.side, styles.right]}>{options.headerRight?.({ tintColor: Colors.text })}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  side: { minWidth: 72, minHeight: 44, justifyContent: 'center' },
  right: { alignItems: 'flex-end', paddingRight: 4 },
  back: { padding: 6 },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: Colors.text },
});
