export const Colors = {
  blue: '#1F4B99',
  blueSoft: '#E6EDF8',
  orange: '#F26A21',
  orangeSoft: '#FDEFE6',
  red: '#E4322B',
  redSoft: '#FDECEC',
  green: '#3BA55C',
  greenSoft: '#E7F5EC',
  yellow: '#F7C600',
  purple: '#7B4FC9',
  purpleSoft: '#F0EAFA',
  background: '#F4F6FA',
  card: '#FFFFFF',
  border: '#DDE3EC',
  text: '#16202E',
  muted: '#667085',
};

export const Student = 'Прудніков О.О., ІПЗ-24-5';

export const NEWS_CATEGORIES = ['Освіта', 'Наука', 'Спорт', 'Студентське життя', 'Міжнародна співпраця'];
export const NEWS_STATUSES = ['Опубліковано', 'Чернетка', 'На перевірці'];
export const USER_ROLES = ['Адміністратор', 'Редактор', 'Автор', 'Читач'];
export const USER_STATUSES = ['Активний', 'Заблокований'];

export const STATUS_COLORS = {
  'Опубліковано': { color: Colors.green, background: Colors.greenSoft },
  'Чернетка': { color: Colors.muted, background: '#EEF1F5' },
  'На перевірці': { color: Colors.orange, background: Colors.orangeSoft },
  'Активний': { color: Colors.green, background: Colors.greenSoft },
  'Заблокований': { color: Colors.red, background: Colors.redSoft },
};

export const LOG_ACTIONS = {
  login: { label: 'Вхід у систему', icon: 'log-in-outline', color: Colors.blue },
  logout: { label: 'Вихід із системи', icon: 'log-out-outline', color: Colors.muted },
  create: { label: 'Створення новини', icon: 'add-circle-outline', color: Colors.green },
  update: { label: 'Редагування новини', icon: 'create-outline', color: Colors.orange },
  delete: { label: 'Видалення новини', icon: 'trash-outline', color: Colors.red },
  status: { label: 'Зміна статусу користувача', icon: 'person-outline', color: Colors.purple },
};
