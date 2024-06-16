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

interface ActiveModal {
  isActive: boolean;
  setIsActive: (arg: boolean) => void;
}

export const ActiveModalContext = createContext<ActiveModal>({} as ActiveModal);

export const ActiveModalProvider: React.FC<Children> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <ActiveModalContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </ActiveModalContext.Provider>
  );
};

interface TodoContext {
  todo: Todo | null;
  setTodo: (arg: Todo | null) => void;
}

export const ActiveTodoContext = createContext<TodoContext>({} as TodoContext);

export const ActiveTodoProvider: React.FC<Children> = ({ children }) => {
  const [todo, setTodo] = useState<Todo | null>(null);

  return (
    <ActiveTodoContext.Provider value={{ todo, setTodo }}>
      {children}
    </ActiveTodoContext.Provider>
  );
};
