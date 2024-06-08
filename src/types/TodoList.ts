import { ChangeEvent } from 'react';
import { Todo } from './Todo';

export interface TodoListProps {
  todos: Todo[];
  handleClick: (status: Todo) => void | Todo;
  filterPost: (status: Todo[]) => Todo[];
  selectedPost: Todo | undefined;
}

export interface TodoModalProps {
  todos: Todo | undefined;
  unSelectTodo: () => void;
}

export interface PropsFilter {
  filterPosts: (e: ChangeEvent<HTMLSelectElement>) => void;
  textFilter: (e: ChangeEvent<HTMLInputElement>) => void;
  isHaveText: string;
  clearButton: () => void;
}

export enum TodoFilterStatus {
  all = 'all',
  active = 'active',
  completed = 'completed',
}
