import { useState } from 'react';

import FilterSheet from '@/components/filter-sheet';
import { NEWS_CATEGORIES, NEWS_STATUSES } from '@/constants/theme';
import { ALL, getNewsFilter, setNewsFilter } from '@/data/store';

export default function NewsFilterSheet() {
  const [filter, setFilter] = useState(getNewsFilter);

  return (
    <FilterSheet
      title="Фільтр новин"
      groups={[
        { label: 'Категорія', options: [ALL, ...NEWS_CATEGORIES], value: filter.category, onChange: (category) => setFilter({ ...filter, category }) },
        { label: 'Статус', options: [ALL, ...NEWS_STATUSES], value: filter.status, onChange: (status) => setFilter({ ...filter, status }) },
      ]}
      onReset={() => setFilter({ category: ALL, status: ALL })}
      onApply={() => setNewsFilter(filter)}
    />
  );
}
