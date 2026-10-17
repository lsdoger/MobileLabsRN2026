import { NEWS_CATEGORIES, NEWS_STATUSES, USER_ROLES } from '@/constants/theme';

const TOPICS = {
  'Освіта': ['Відкрито набір на курси з мобільної розробки', 'Оновлено розклад консультацій', 'Запрошуємо на день відкритих дверей', 'Стартувала реєстрація на вибіркові дисципліни'],
  'Наука': ['В університеті відбулася наукова конференція', 'Студенти ФІКТ перемогли в хакатоні', 'Відкрито нову лабораторію робототехніки', 'Опубліковано збірник студентських статей'],
  'Спорт': ['Збірна університету здобула перемогу в турнірі', 'Стартує університетська ліга з футзалу', 'Відкрито запис до спортивних секцій', 'Відбувся забіг до Дня університету'],
  'Студентське життя': ['Студрада запрошує на осінній фестиваль', 'Відбувся конкурс талантів першокурсників', 'Стартує волонтерський проєкт студентів', 'Оголошено фотоконкурс «Мій університет»'],
  'Міжнародна співпраця': ['Стартує програма академічної мобільності', 'Університет підписав угоду з європейським партнером', 'Відкрито конкурс на навчання за кордоном', 'До університету завітала делегація з Польщі'],
};

const FIRST_NAMES = ['Олександр', 'Марія', 'Андрій', 'Олена', 'Дмитро', 'Ірина', 'Максим', 'Наталія', 'Владислав', 'Юлія', 'Богдан', 'Софія', 'Тарас', 'Анна'];
const LAST_NAMES = ['Коваленко', 'Шевчук', 'Бондаренко', 'Ткаченко', 'Мельник', 'Кравченко', 'Олійник', 'Лисенко', 'Савченко', 'Руденко', 'Мороз', 'Поліщук'];
const LATIN = { Олександр: 'oleksandr', Марія: 'mariia', Андрій: 'andrii', Олена: 'olena', Дмитро: 'dmytro', Ірина: 'iryna', Максим: 'maksym', Наталія: 'nataliia', Владислав: 'vladyslav', Юлія: 'yuliia', Богдан: 'bohdan', Софія: 'sofiia', Тарас: 'taras', Анна: 'anna' };

const BASE = new Date(2026, 9, 15, 18, 0).getTime();
const HOUR = 60 * 60 * 1000;

export function makeNews(count) {
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const category = NEWS_CATEGORIES[i % NEWS_CATEGORIES.length];
    const topics = TOPICS[category];
    const title = topics[Math.floor(i / NEWS_CATEGORIES.length) % topics.length];
    return {
      id: String(id),
      title: `${title} (№${id})`,
      category,
      status: NEWS_STATUSES[(i * 7) % 10 < 6 ? 0 : (i * 7) % 10 < 8 ? 1 : 2],
      image: `https://picsum.photos/seed/news${id}/800/450`,
      text: `Повний текст новини №${id} з категорії «${category}». ${title}. Деталі події, коментарі організаторів та фото можна знайти в цьому матеріалі. Новину підготувала редакція порталу університету.`,
      createdAt: new Date(BASE - i * 9 * HOUR).toISOString(),
    };
  });
}

export function makeUsers(count) {
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 5) % LAST_NAMES.length];
    return {
      id: `u${i + 1}`,
      name: `${first} ${last}`,
      email: `${LATIN[first]}.${i + 1}@ztu.edu.ua`,
      role: i < 3 ? USER_ROLES[i] : USER_ROLES[1 + (i % 3)],
      status: i % 9 === 4 ? 'Заблокований' : 'Активний',
    };
  });
}

const LOG_SEED = [
  ['login', () => 'Успішний вхід'],
  ['create', (n) => `«${n.title}»`],
  ['update', (n) => `«${n.title}»: змінено текст`],
  ['status', (_, u) => `${u.name}: Активний → Заблокований`],
  ['delete', (n) => `«${n.title}»`],
  ['logout', () => 'Завершення сеансу'],
];

export function makeLogs(count, news, users) {
  return Array.from({ length: count }, (_, i) => {
    const [action, details] = LOG_SEED[i % LOG_SEED.length];
    const editor = users[(i * 3) % 6];
    return {
      id: `l${count - i}`,
      action,
      user: editor.email,
      details: details(news[i % news.length], users[(i * 7) % users.length]),
      date: new Date(BASE - i * 5 * HOUR).toISOString(),
    };
  });
}
