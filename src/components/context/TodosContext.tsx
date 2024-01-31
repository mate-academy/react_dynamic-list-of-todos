import React, { useMemo, useState } from 'react';
import { Context } from '../../types/Context';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodosContext = React.createContext<Context>({
  isShow: false,
  setIsShow: () => { },
  selectedTodo: null,
  setSelectedTodo: () => { },
  filterTodos: Status.all,
  setFilterTodos: () => { },
  query: '',
  setQuery: () => { },
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterTodos, setFilterTodos] = useState<Status>(Status.all);
  const [query, setQuery] = useState('');

  const value = useMemo(() => ({
    isShow,
    setIsShow,
    selectedTodo,
    setSelectedTodo,
    filterTodos,
    setFilterTodos,
    query,
    setQuery,
  }), [isShow, selectedTodo, filterTodos, query]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
