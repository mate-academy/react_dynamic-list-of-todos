export enum FilterOptions {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type FilterType = {
  filterByTitle: string,
  filterByStatus: FilterOptions,
};
