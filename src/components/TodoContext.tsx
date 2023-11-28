import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterOption } from '../types/FilterOption';
import { getTodos } from '../api';

interface TodosContextType {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  filterOption: FilterOption,
  setFilterOption: (filterOption: FilterOption) => void,
  query: string,
  setQuery: (query: string) => void,
  selectedIdTodo: number,
  setSelectedIdTodo: (id: number) => void,
}

export const TodoContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => { },
  filterOption: FilterOption.All,
  setFilterOption: () => { },
  query: '',
  setQuery: () => { },
  selectedIdTodo: 0,
  setSelectedIdTodo: () => { },
});

type Props = {
  children: React.ReactNode;
  turnOffLoad: (turnOff: boolean) => void;
};

export const TodoContextProvider: React.FC<Props> = (
  { children, turnOffLoad },
) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption]
    = useState<FilterOption>(FilterOption.All);
  const [query, setQuery] = useState('');
  const [selectedIdTodo, setSelectedIdTodo] = useState(0);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
        turnOffLoad(false);
      });
  }, [turnOffLoad]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterOption,
    setFilterOption,
    query,
    setQuery,
    selectedIdTodo,
    setSelectedIdTodo,
  }), [todos, filterOption, query, selectedIdTodo]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
