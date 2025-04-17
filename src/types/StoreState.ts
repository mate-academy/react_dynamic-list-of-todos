import { Todo } from './Todo';

export enum TodoFilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface StoreState {
  todos: Todo[];
  allTodos: Todo[];
  filter: SearchState;
  inLoadTodo: boolean;
  inLoadModal: {
    opened: boolean;
    todo?: Todo | null;
  };
}

export interface SearchState {
  search: string;
  status: TodoFilterStatus;
}

export interface SearchFilter {
  type: 'search';
  payload: SearchState;
}

export interface InLoadTodoState {
  type: 'load';
  payload: boolean;
}

export interface InitFilter {
  type: 'init';
  payload: Todo[];
}

export interface InLoadModalState {
  type: 'modal';
  payload: {
    opened: boolean;
    todo?: Todo | null;
  };
}

export type Filter =
  | SearchFilter
  | InitFilter
  | InLoadTodoState
  | InLoadModalState;
