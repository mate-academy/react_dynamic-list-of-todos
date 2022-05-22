import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './API/api';

export enum TodoStatus {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

interface TodosContextInterface {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  todoTitle: string,
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>,
  todoStatus: TodoStatus,
  setTodoStatus: React.Dispatch<React.SetStateAction<TodoStatus>>,
  hasLoadingError: boolean,
  setHasLoadingError: React.Dispatch<React.SetStateAction<boolean>>,
}

export const TodosContext
  = React.createContext<TodosContextInterface>({
    todos: [],
    setTodos: () => {},
    todoTitle: '',
    setTodoTitle: () => {},
    todoStatus: TodoStatus.all,
    setTodoStatus: () => {},
    hasLoadingError: false,
    setHasLoadingError: () => {},
  });

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoStatus, setTodoStatus] = useState(TodoStatus.all);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data));
  }, []);

  const contextValue = useMemo(() => ({
    todos,
    setTodos,
    todoTitle,
    setTodoTitle,
    todoStatus,
    setTodoStatus,
    hasLoadingError,
    setHasLoadingError,
  }), [todos, todoTitle, todoStatus, hasLoadingError]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
