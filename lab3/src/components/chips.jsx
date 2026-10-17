import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';

// Вибір одного значення зі списку
export default function Chips({ options, value, onChange }) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable key={option} onPress={() => onChange(option)} style={[styles.chip, active && styles.active]}>
            <Text style={[styles.text, active && styles.activeText]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  active: { backgroundColor: Colors.blue, borderColor: Colors.blue },
  text: { fontSize: 14, color: Colors.text },
  activeText: { color: '#fff', fontWeight: '600' },
});
