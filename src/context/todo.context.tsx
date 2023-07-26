import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Todo, TodoWithUser } from '../types/Todo';
import { getTodos, getUser } from '../api';
import { getFilteredTodos, IOptionsTodos } from '../services/todo.service';
import { useModal } from '../hooks/useModal';

interface ITodoContext {
  visibleTodos: Todo[],
  handleTodosByFilter: (options: IOptionsTodos) => void,
  loadingTodoList: boolean,
  handleSelectTodo: (todo: Todo) => void,
  discardSelectedTodo: () => void,
  isModalOpen: boolean,
  loadingUser: boolean,
  selectedTodo: TodoWithUser | null,
}

export const TodoContext
  = React.createContext<ITodoContext>({} as ITodoContext);

export const TodoProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [totalTodos, setTotalTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loadingTodoList, setLoadingTodoList] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<TodoWithUser | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    getTodos()
      .then(
        (response) => {
          setTotalTodos(response);
          setVisibleTodos(response);
        },
      )
      .finally(() => setLoadingTodoList(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    openModal();

    getUser(todo.userId)
      .then(response => setSelectedTodo({ ...todo, user: response }))
      .finally(() => setLoadingUser(false));
  };

  const handleTodosByFilter = (options: IOptionsTodos) => {
    const filteredTodos = getFilteredTodos(totalTodos, options);

    setVisibleTodos(filteredTodos);
  };

  const discardSelectedTodo = () => {
    setSelectedTodo(null);
    closeModal();
  };

  return (
    <TodoContext.Provider value={{
      visibleTodos,
      handleTodosByFilter,
      loadingTodoList,
      handleSelectTodo,
      discardSelectedTodo,
      isModalOpen: isOpen,
      loadingUser,
      selectedTodo,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};
