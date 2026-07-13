export const TodosFilter = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type FilterValue = (typeof TodosFilter)[keyof typeof TodosFilter];
