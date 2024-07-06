export type FiltersInput = (
  key: keyof Filters,
  value: string | Completed,
) => void;

export enum Completed {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Filters {
  search: string;
  completed: Completed;
}
