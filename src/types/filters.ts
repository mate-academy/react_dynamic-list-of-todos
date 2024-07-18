export type FiltersInput = (
  key: keyof Filters,
  value: string | Completed,
) => void;

export enum Completed {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export interface Filters {
  search: string;
  completed: Completed;
}
