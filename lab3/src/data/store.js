import { makeLogs, makeNews, makeUsers } from './generate';

// Локальні масиви об'єктів. При кожній зміні масив замінюється новим,
// тому списки бачать нові дані, а useSyncExternalStore перемальовує екрани
let news = makeNews(60);
let users = makeUsers(55);
let logs = makeLogs(50, news, users);

export const ALL = 'Усі';
let newsFilter = { category: ALL, status: ALL };
let usersFilter = { role: ALL, status: ALL };

let actor = 'admin@ztu.edu.ua';
let nextNewsId = news.length + 1;
let nextLogId = logs.length + 1;

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getNews = () => news;
export const getUsers = () => users;
export const getLogs = () => logs;
export const getNewsFilter = () => newsFilter;
export const getUsersFilter = () => usersFilter;
export const getNewsById = (id) => news.find((n) => n.id === id);

export function setActor(email) {
  actor = email;
}

export function addLog(action, details) {
  logs = [{ id: `l${nextLogId++}`, action, user: actor, details, date: new Date().toISOString() }, ...logs];
  emit();
}

export function createNews(data) {
  const item = { ...data, id: String(nextNewsId++), createdAt: new Date().toISOString() };
  news = [item, ...news];
  addLog('create', `«${item.title}»`);
  return item;
}

export function updateNews(id, data) {
  news = news.map((n) => (n.id === id ? { ...n, ...data } : n));
  addLog('update', `«${data.title}»`);
}

export function deleteNews(id) {
  const item = getNewsById(id);
  news = news.filter((n) => n.id !== id);
  addLog('delete', `«${item?.title}»`);
}

export function toggleUserStatus(id) {
  const user = users.find((u) => u.id === id);
  const status = user.status === 'Активний' ? 'Заблокований' : 'Активний';
  users = users.map((u) => (u.id === id ? { ...u, status } : u));
  addLog('status', `${user.name}: ${user.status} → ${status}`);
}

export function setNewsFilter(filter) {
  newsFilter = filter;
  emit();
}

export function setUsersFilter(filter) {
  usersFilter = filter;
  emit();
}
