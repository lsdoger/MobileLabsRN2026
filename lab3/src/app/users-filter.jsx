import { useState } from 'react';

import FilterSheet from '@/components/filter-sheet';
import { USER_ROLES, USER_STATUSES } from '@/constants/theme';
import { ALL, getUsersFilter, setUsersFilter } from '@/data/store';

export default function UsersFilterSheet() {
  const [filter, setFilter] = useState(getUsersFilter);

  return (
    <FilterSheet
      title="Фільтр користувачів"
      groups={[
        { label: 'Роль', options: [ALL, ...USER_ROLES], value: filter.role, onChange: (role) => setFilter({ ...filter, role }) },
        { label: 'Статус', options: [ALL, ...USER_STATUSES], value: filter.status, onChange: (status) => setFilter({ ...filter, status }) },
      ]}
      onReset={() => setFilter({ role: ALL, status: ALL })}
      onApply={() => setUsersFilter(filter)}
    />
  );
}
