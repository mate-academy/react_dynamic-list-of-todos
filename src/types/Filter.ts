export enum SortField {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface IQuery {
  status: string;
  query: string;
}
