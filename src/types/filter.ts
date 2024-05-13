export enum SortField {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type FilterType = {
  sortField: SortField;
  query: string;
};
