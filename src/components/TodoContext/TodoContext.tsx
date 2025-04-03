import React, { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoContextType = {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  filteredTodos: Todo[];
  setFilteredTodos: (todo: Todo[]) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  isModalLoading: boolean;
  setIsModalLoading: (isLoading: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  filteredTodos: [],
  setFilteredTodos: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
  isModalLoading: false,
  setIsModalLoading: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filteredTodos,
      setFilteredTodos,
      selectedTodo,
      setSelectedTodo,
      isModalLoading,
      setIsModalLoading,
      selectedUser,
      setSelectedUser,
    }),
    [
      todos,
      filteredTodos,
      setFilteredTodos,
      selectedTodo,
      isModalLoading,
      selectedUser,
    ],
  );

  // prettier-ignore
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
