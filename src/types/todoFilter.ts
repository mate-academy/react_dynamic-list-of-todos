export const STATUS_VALUE_TEXT_MAPPING = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
} as const;

export type StatusFilter = keyof typeof STATUS_VALUE_TEXT_MAPPING;
