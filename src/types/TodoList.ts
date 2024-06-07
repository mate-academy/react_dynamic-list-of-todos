import { ChangeEvent } from 'react';
import { Todo } from './Todo';

export interface TodoListProps {
  todo: Todo[];
  loading: (status: boolean) => boolean | void;
  setPost: (status: Todo) => void;
  filterPost: (status: Todo[]) => Todo[];
  selectedPost: Todo | undefined;
}

export interface TodoModalProps {
  todos: Todo | undefined;
  loading: (status: boolean) => boolean | void;
  unSelectTodo: () => void;
}

export interface PropsFilter {
  filterPosts: (e: ChangeEvent<HTMLSelectElement>) => void;
  textFilter: (e: ChangeEvent<HTMLInputElement>) => void;
  isHaveText: string;
  clearButton: () => void;
}
