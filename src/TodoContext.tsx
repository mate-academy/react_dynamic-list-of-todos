import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';

interface ContextValues {
  todos: Todo[],
  isLoading: boolean,
  modalWindow: boolean,
  selectedTodo: Todo | null,
  isModalLoading: boolean,
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
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [modalWindow, setModalWindow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterOption, setFilterOption]
  = useState<StateOption>(StateOption.all);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectedTodo = (todo: Todo) => {
    setModalWindow(true);
    setIsModalLoading(true);
    getUser(todo.userId)
      .then(response => setSelectedTodo({
        ...todo,
        user: response,
      }))
      .finally(() => setIsModalLoading(false));
  };

  const closeModal = () => {
    setModalWindow(false);
    setSelectedTodo(null);
  };

  const filterTodos = (
    array: Todo[], filterQuery: string, selectedFilterOption: string,
  ) => {
    let filteredArray = [...array];
    const normalizedQuery = filterQuery.toLowerCase().trim();

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
    isLoading,
    modalWindow,
    selectedTodo,
    isModalLoading,
    handleSelectedTodo,
    closeModal,
    filterTodos,
    query,
    setQuery,
    filterOption,
    setFilterOption,
  }), [
    todos,
    isLoading,
    selectedTodo,
    isModalLoading,
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
