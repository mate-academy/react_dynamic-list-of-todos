import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';

interface ContextValues {
  todos: Todo[],
  loading: boolean,
  modalWindow: boolean,
  selectedTodo: Todo | null,
  modalLoading: boolean,
  handleSelectedTodo: (todo: Todo) => void,
  closeModal: () => void,
  filterTodos: ({ query, filterOption }: FilterOptions) => void,
}

interface FilterOptions {
  query: string,
  filterOption: string,
}

export enum StateOption {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoContext = React.createContext({} as ContextValues);

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalWindow, setModalWindow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(response => {
        setTodos(response);
        setFilteredTodos(response);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedTodo = (todo: Todo) => {
    setModalWindow(true);
    setModalLoading(true);
    getUser(todo.userId)
      .then(response => setSelectedTodo({
        ...todo,
        user: response,
      }))
      .finally(() => setModalLoading(false));
  };

  const closeModal = () => {
    setModalWindow(false);
    setSelectedTodo(null);
  };

  const filterTodos = ({ query, filterOption }: FilterOptions) => {
    let filteredArray = [...filteredTodos];

    if (query) {
      const normalizedQuery = query.toLowerCase();

      filteredArray = filteredArray.filter(todo => todo.title
        .toLowerCase().includes(normalizedQuery));
    }

    if (filterOption) {
      filteredArray = filteredArray.filter(todo => {
        switch (filterOption) {
          case StateOption.active:
            return !todo.completed;
          case StateOption.completed:
            return todo.completed;
          default:
            return todo;
        }
      });
    }

    setTodos(filteredArray);
  };

  const contextValues = useMemo(() => ({
    todos,
    loading,
    modalWindow,
    selectedTodo,
    modalLoading,
    handleSelectedTodo,
    closeModal,
    filterTodos,
  }), [
    todos,
    loading,
    selectedTodo,
    modalLoading,
    modalWindow,
  ]);

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};
