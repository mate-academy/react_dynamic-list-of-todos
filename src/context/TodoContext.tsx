/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useState, useMemo } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type Props = {
  children: ReactNode
};

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  todo: {} as Todo | null,
  status: Status.All,
  query: '',
});

export const TodoUpdateContext = React.createContext({
  setTodos: (_todos: Todo[]) => { },
  setTodo: (_todo: Todo | null) => { },
  setStatus: (_status: Status) => { },
  setQuery: (_query: string) => { },
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');

  const valueTodoContext = {
    todos,
    todo,
    status,
    query,
  };

  const valueTodoUpdateContext = useMemo(() => {
    return {
      setTodos,
      setTodo,
      setStatus,
      setQuery,
    };
  }, []);

  return (
    <TodoUpdateContext.Provider value={valueTodoUpdateContext}>
      <TodoContext.Provider value={valueTodoContext}>
        {children}
      </TodoContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
