import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';

interface ContextValues {
  todos: Todo[],
  loading: boolean,
  modalWindow: boolean,
  selectedTodo: Todo | null,
  modalLoading: boolean,
  query: string,
  filterOption: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setFilterOption: React.Dispatch<React.SetStateAction<StateOption>>,
  handleSelectedTodo: (todo: Todo) => void,
  closeModal: () => void,
  filterTodos: (
    array: Todo[], filterQuery:string, selectedFilterOption: string
  ) => Todo[],
}

export enum StateOption {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoContext = React.createContext({} as ContextValues);

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalWindow, setModalWindow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterOption, setFilterOption]
  = useState<StateOption>(StateOption.all);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(response => {
        setTodos(response);
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

  const filterTodos = (
    array: Todo[], filterQuery: string, selectedFilterOption: string,
  ) => {
    let filteredArray = [...array];
    const normalizedQuery = filterQuery.toLowerCase();

    if (normalizedQuery) {
      filteredArray = filteredArray.filter(todo => todo.title
        .toLowerCase().includes(normalizedQuery));
    }

    if (selectedFilterOption) {
      filteredArray = filteredArray.filter(todo => {
        switch (selectedFilterOption) {
          case StateOption.active:
            return !todo.completed;
          case StateOption.completed:
            return todo.completed;
          default:
            return todo;
        }
      });
    }

    return filteredArray;
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
    query,
    setQuery,
    filterOption,
    setFilterOption,
  }), [
    todos,
    loading,
    selectedTodo,
    modalLoading,
    modalWindow,
    query,
    filterOption,
  ]);

  return (
    <TodoContext.Provider value={contextValues}>
      {children}
    </TodoContext.Provider>
  );
};
