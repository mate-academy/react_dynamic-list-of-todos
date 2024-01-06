export enum Filter {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export type SortType = {
  sortBy: Filter,
  query: string;
};
