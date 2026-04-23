import React from 'react';
import { Todo } from '../types/Todo';
import { FILTER, Filter } from '../types/Filter';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const TodosContext = React.createContext<TodosContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filter, setFilter] = React.useState<Filter>(FILTER.ALL);
  const [query, setQuery] = React.useState('');

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, filter, setFilter, query, setQuery }}
    >
      {children}
    </TodosContext.Provider>
  );
};
