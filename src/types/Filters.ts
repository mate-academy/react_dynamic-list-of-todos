export type Filter = 'all' | 'active' | 'completed';

export interface Filters {
  filter: Filter;
  search: string;
}
