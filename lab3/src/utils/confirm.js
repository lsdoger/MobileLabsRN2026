import { Alert, Platform } from 'react-native';

// Alert.alert у браузері нічого не показує, тому для web використовуємо window.confirm
export function confirm(title, message, confirmText, onConfirm) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Скасувати', style: 'cancel' },
    { text: confirmText, style: 'destructive', onPress: onConfirm },
  ]);
}
