export enum Select {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Filters {
  search: string;
  select: Select;
}

export type FiltersInput = (key: keyof Filters, value: string | Select) => void;
