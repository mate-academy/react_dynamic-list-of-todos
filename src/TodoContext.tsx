/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Select } from './types/Select';

const todosList: Todo[] = [];

export const TodoContext = React.createContext({
  todosList,
  loader: false,
  filterSelect: Select.All,
  setFilterSelect: (_select: Select) => {},
  search: '',
  setSearch: (_search: string) => {},
  todo: null as Todo | null,
  setTodo: (_todo: Todo | null) => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalPostsProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [filterSelect, setFilterSelect] = useState(Select.All);
  const [search, setSearch] = useState('');
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoader(false));
  }, []);

  const value = {
    todosList: todos,
    loader,
    filterSelect,
    setFilterSelect,
    search,
    setSearch,
    todo,
    setTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
