export const userFilters = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'role',
    label: 'Role',
    options: [
      {
        key: 'USER',
        label: 'User',
      },
      {
        key: 'ADMIN',
        label: 'Admin',
      },
    ],
  },
  {
    key: 'is_active',
    label: 'Status',
    options: [
      {
        key: 'true',
        label: 'Active',
      },
      {
        key: 'false',
        label: 'Inactive',
      },
    ],
  },
]

export const userSorts = [
  {
    key: 'created_at',
    label: 'Sort by created date',
    direction: 0,
  },
]
