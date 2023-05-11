import { createContext } from 'react';
import { Todo } from '../types/Todo';

export const TodoContext = createContext<{
  selectedTodo: Todo | null;
  setSelectedTodo:(todo: Todo | null) => void;
}>({
      selectedTodo: null,
      setSelectedTodo: () => {},
    });
