import type { ImageSourcePropType } from 'react-native';

// Новини та фото взято з сайту університету (ztu.edu.ua, news.ztu.edu.ua)
// і покладено в assets, щоб застосунок працював без інтернету.

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  text: string;
  image: ImageSourcePropType;
}

export interface Photo {
  id: string;
  image: ImageSourcePropType;
  caption: string;
}

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Міжнародна перемога: Житомирська політехніка та Лундський університет розбудовуватимуть інноваційну екосистему України',
    date: 'жовтень 2026',
    text: 'Житомирська політехніка та Лундський університет стали партнерами в міжнародному проєкті з розбудови інноваційної екосистеми України.',
    image: require('@/assets/images/news/n1.jpg'),
  },
  {
    id: '2',
    title: 'Круглий стіл «Європейська освіта очима студентів Erasmus»: досвід, враження та нові можливості',
    date: 'жовтень 2026',
    text: 'Студенти, які навчалися за програмою академічної мобільності Erasmus+, поділилися досвідом навчання в європейських університетах.',
    image: require('@/assets/images/news/n2.jpg'),
  },
  {
    id: '3',
    title: 'У Житомирській політехніці відбулося офіційне відкриття проєкту RE:Access Zhytomyr!',
    date: 'вересень 2026',
    text: 'В університеті офіційно стартував проєкт RE:Access Zhytomyr. Детальніше - на сайті news.ztu.edu.ua.',
    image: require('@/assets/images/news/n3.jpg'),
  },
  {
    id: '4',
    title: 'Вітаємо команду Інноваційний хаб Житомирської політехніки з офіційним запуском Incub8!',
    date: 'вересень 2026',
    text: 'Інноваційний хаб Житомирської політехніки офіційно запустив Incub8. Детальніше - на сайті news.ztu.edu.ua.',
    image: require('@/assets/images/news/n4.jpg'),
  },
  {
    id: '5',
    title: 'У Житомирській політехніці відбулося урочисте вручення стипендій ректора та відзнак Житомирської обласної ради',
    date: 'вересень 2026',
    text: 'Студентам університету урочисто вручили стипендії ректора та відзнаки Житомирської обласної ради.',
    image: require('@/assets/images/news/n5.jpg'),
  },
];

const galleryImages: ImageSourcePropType[] = [
  require('@/assets/images/gallery/g1.jpg'),
  require('@/assets/images/gallery/g2.jpg'),
  require('@/assets/images/gallery/g3.jpg'),
  require('@/assets/images/gallery/g4.jpg'),
  require('@/assets/images/gallery/g5.jpg'),
  ...NEWS.map((n) => n.image),
];

export const PHOTOS: Photo[] = galleryImages.map((image, i) => ({
  id: String(i + 1),
  image,
  caption: `Фото ${i + 1}`,
}));
