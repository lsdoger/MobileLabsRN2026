import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Student } from '@/constants/theme';
import { useAuth } from '@/context/auth';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const value = email.trim();
    if (value === 'test' && password === 'test') return login('test@ztu.edu.ua');
    if (!/^\S+@\S+\.\S+$/.test(value)) return setError('Введіть коректний email');
    if (password.length < 6) return setError('Пароль має містити щонайменше 6 символів');
    setError('');
    login(value);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.wrap} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.logo}>
          <Ionicons name="shield-checkmark" size={40} color="#fff" />
        </View>
        <Text style={styles.title}>Адмін-панель порталу новин</Text>
        <Text style={styles.subtitle}>Лабораторна робота 3 · {Student}</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="admin@ztu.edu.ua"
            placeholderTextColor={Colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="щонайменше 6 символів"
            placeholderTextColor={Colors.muted}
            secureTextEntry
            style={styles.input}
            onSubmitEditing={submit}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }]} onPress={submit}>
            <Text style={styles.buttonText}>Увійти</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  wrap: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { marginTop: 16, fontSize: 24, fontWeight: '800', color: Colors.text, textAlign: 'center' },
  subtitle: { marginTop: 4, fontSize: 13, color: Colors.muted, textAlign: 'center' },
  form: {
    marginTop: 28,
    padding: 18,
    gap: 8,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: { fontSize: 13, fontWeight: '600', color: Colors.text },
  input: {
    height: 46,
    paddingHorizontal: 12,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: '#F8FAFC',
    fontSize: 16,
    color: Colors.text,
  },
  error: { color: Colors.red, fontSize: 13 },
  button: {
    marginTop: 6,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
