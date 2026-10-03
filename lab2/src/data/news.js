import { Colors } from '@/constants/theme';

// Генератор тестових новин: дані детерміновані, тому екран деталей знаходить новину за id
export const TOTAL_NEWS = 200;
export const PAGE_SIZE = 20;

const CATEGORIES = [
  {
    name: 'Освіта',
    color: Colors.blue,
    topics: ['Відкрито набір на курси з мобільної розробки', 'Оновлено розклад консультацій', 'Запрошуємо на день відкритих дверей'],
  },
  {
    name: 'Наука',
    color: Colors.purple,
    topics: ['В університеті відбулася наукова конференція', 'Студенти ФІКТ перемогли в хакатоні', 'Відкрито новий комп\'ютерний клас'],
  },
  {
    name: 'Спорт',
    color: Colors.green,
    topics: ['Збірна університету здобула перемогу в турнірі', 'Стартує університетська ліга з футзалу', 'Відкрито запис до спортивних секцій'],
  },
  {
    name: 'Студентське життя',
    color: Colors.orange,
    topics: ['Студрада запрошує на осінній фестиваль', 'Відбувся конкурс талантів першокурсників', 'Стартує волонтерський проєкт студентів'],
  },
  {
    name: 'Міжнародна співпраця',
    color: Colors.red,
    topics: ['Стартує програма академічної мобільності', 'Університет підписав угоду з європейським партнером', 'Відкрито конкурс на навчання за кордоном'],
  },
];

const pad = (n) => String(n).padStart(2, '0');

export function makeNews(id) {
  const category = CATEGORIES[id % CATEGORIES.length];
  const topic = category.topics[Math.floor(id / CATEGORIES.length) % category.topics.length];
  const date = new Date(2026, 9, 3);
  date.setDate(date.getDate() - Math.floor(id / 3));
  return {
    id: String(id),
    title: `${topic} (№${id})`,
    category: category.name,
    color: category.color,
    date: `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`,
    summary: `Короткий опис новини №${id} з категорії «${category.name}».`,
    body: [
      `Це повний текст новини №${id}. Вона належить до категорії «${category.name}» і опублікована ${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}.`,
      'Екран деталей відкривається за динамічним маршрутом [id]: Expo Router передає ідентифікатор новини в адресі, а екран отримує його хуком useLocalSearchParams і за ним знаходить потрібну новину.',
      'Дані згенеровано програмно, щоб продемонструвати роботу FlatList з великою кількістю елементів, оновлення жестом Pull-to-Refresh та підвантаження при прокручуванні.',
    ],
  };
}

export function getNewsById(id) {
  const n = Number(id);
  return Number.isInteger(n) && n >= 1 && n <= TOTAL_NEWS ? makeNews(n) : null;
}

// Імітація запиту до сервера: повертає сторінку новин із затримкою
export function fetchNewsPage(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE + 1;
      const end = Math.min(start + PAGE_SIZE - 1, TOTAL_NEWS);
      const items = [];
      for (let id = start; id <= end; id++) items.push(makeNews(id));
      resolve({ items, hasMore: end < TOTAL_NEWS });
    }, 700);
  });
}
