import React, { useEffect, useState } from 'react';
import { TodosContextType } from './types/TodoContextType';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const TodoContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  visibleTodos: () => [],
  filter: Status.ALL,
  setFilter: () => {},
  // selectedTodo: null,
  // setSelectedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Status.ALL);
  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    // setLoading(true);
    getTodos().then(setTodos);
  }, []);

  const visibleTodos = () => {
    switch (filter) {
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const value = {
    todos,
    setTodos,
    visibleTodos,
    filter,
    setFilter,
    // selectedTodo,
    // setSelectedTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
