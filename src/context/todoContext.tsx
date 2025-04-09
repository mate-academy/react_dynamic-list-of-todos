/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useContext, useState } from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  activeEye: { [key: string]: boolean };
  setActiveEye: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [activeEye, setActiveEye] = useState<{ [key: string]: boolean }>({});
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <TodoContext.Provider
      value={{
        selectedTodo,
        setSelectedTodo,
        activeEye,
        setActiveEye,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};
