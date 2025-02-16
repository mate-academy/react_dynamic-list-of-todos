export enum FinishQuery {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Query {
  finishQuery: FinishQuery;
  searchQuery: string;
}
