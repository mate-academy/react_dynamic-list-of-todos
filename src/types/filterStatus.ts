export const FILTER_STATUSES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type FilterStatus =
  (typeof FILTER_STATUSES)[keyof typeof FILTER_STATUSES];
