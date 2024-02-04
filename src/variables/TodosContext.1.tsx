import React from 'react';
import { TodoContext } from '../types/TodoContext';
import { TODO_FOR_START } from './TODO_FOR_START';

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => { },
  query: '',
  setQuery: () => { },
  isModal: false,
  setIsModal: () => { },
  modaledTodo: TODO_FOR_START,
  setModaledTodo: () => { },
  status: '',
  setStatus: () => { },
  visibleTodos: [],
});
