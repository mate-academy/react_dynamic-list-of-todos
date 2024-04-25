export enum FilterBy {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export type FilterAction = FilterBy.all | FilterBy.active | FilterBy.completed;
