import React from 'react';
import { Todo } from './Todo';

export interface TodoContext {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  modaledTodo: Todo;
  setModaledTodo: React.Dispatch<React.SetStateAction<Todo>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  visibleTodos: Todo[];
}
