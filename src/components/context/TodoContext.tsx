import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { Filter } from '../../types/Filter';

type TodoContextProps = {
  originalTodos: Todo[] | null;
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined,
);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoContextProvider');
  }

  return context;
};

type TodoContextProviderProps = React.PropsWithChildren<{}>;

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [originalTodos, setOriginalTodos] = useState<Todo[] | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos();

      setOriginalTodos(todos);
    };

    loadTodos();
  }, []);

  const value = {
    originalTodos,
    filter,
    setFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
