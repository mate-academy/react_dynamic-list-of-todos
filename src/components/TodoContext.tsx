import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type Prop = {
  selectedTodo: Todo | null,
  setSelectedTodo: (isSelected: Todo | null) => void,
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  loader: boolean,
  setLoader: (loader: boolean) => void,
  query: string,
  setQuery: (query: string) => void,
  selectedSelect: string,
  setSelect: (selectedSelect: string) => void,
};

export const TodoContext = React.createContext<Prop>({
  selectedTodo: null,
  setSelectedTodo: () => {},
  todos: [],
  setTodos: () => {},
  loader: false,
  setLoader: () => {},
  query: '',
  setQuery: () => {},
  selectedSelect: '',
  setSelect: () => {},
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedSelect, setSelect] = useState('');

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then((result => {
        setTodos(result);
      }))
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const value = useMemo(() => ({
    selectedTodo,
    setSelectedTodo,
    todos,
    setTodos,
    loader,
    setLoader,
    query,
    setQuery,
    selectedSelect,
    setSelect,
  }
  ), [loader, query, selectedSelect, selectedTodo,
    todos]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
