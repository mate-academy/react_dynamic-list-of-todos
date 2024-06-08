export enum SortQuery {
  ACTIVE = 'active',
  COMPLETED = 'completed',

  // default
  ALL = 'all',
}

export interface SortParams {
  search: string;
  query: SortQuery;
}
