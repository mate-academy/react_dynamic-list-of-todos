type FilterOptions = 'all' | 'active' | 'completed';

export type FilterConfig = {
  query: string;
  filterOption: FilterOptions;
};
