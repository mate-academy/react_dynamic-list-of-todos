import { createContext, useState } from 'react';
import React from 'react';
import { Todo } from '../types/Types';

interface Children {
  children: React.ReactNode;
}

export const QueryContext = createContext({
  query: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setQuery: (_arg: string) => {},
});

export const QueryProvider: React.FC<Children> = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

interface UserId {
  activeUser: number | undefined;
  setActiveUser: (arg: number) => void;
}

export const UserIdContext = createContext<UserId>({} as UserId);

export const UserIdProvider: React.FC<Children> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<number | undefined>();

  return (
    <UserIdContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </UserIdContext.Provider>
  );
};

interface TodoContext {
  todo: Todo;
  setTodo: (arg: Todo) => void;
}

export const ActiveTodoContext = createContext<TodoContext>({} as TodoContext);

export const ActiveTodoProvider: React.FC<Children> = ({ children }) => {
  const [todo, setTodo] = useState<Todo>({} as Todo);

  return (
    <ActiveTodoContext.Provider value={{ todo, setTodo }}>
      {children}
    </ActiveTodoContext.Provider>
  );
};
