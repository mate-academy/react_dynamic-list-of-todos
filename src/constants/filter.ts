export const FILTER = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export type Filter = keyof typeof FILTER;
