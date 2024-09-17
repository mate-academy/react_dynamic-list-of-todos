import { Todo } from './Todo';

export type Select = Todo | null;

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface FilterCriteria {
  status: Status;
  searchInput: string;
}
