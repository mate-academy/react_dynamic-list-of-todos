import React, { useEffect, useState } from 'react';
import { getTodos, getUser } from '../../api';
import { ContextTodo } from '../../types/ContextTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<ContextTodo>({
  allTodos: [],
  setAllTodos: () => {},
  filteredTodos: [],
  setFilteredTodos: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isLoadingModal: false,
  setIsLoadingModal: () => {},
  query: '',
  setQuery: () => {},
  selectOption: '',
  setSelectOption: () => {},
  selectTodo: null,
  setSelectTodo: () => {},
  user: null,
  setUser: () => {},
});

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectOption, setSelectOption] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setAllTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectTodo) {
      setIsLoadingModal(true);

      getUser(selectTodo.userId)
        .then(setUser)
        .finally(() => {
          setIsLoadingModal(false);
        });
    }
  }, [selectTodo]);

  useEffect(() => {
    const filterTodos = () => {
      let filtered = [...allTodos];

      if (selectOption === 'active') {
        filtered = filtered.filter((todo) => !todo.completed);
      } else if (selectOption === 'completed') {
        filtered = filtered.filter((todo) => todo.completed);
      }

      filtered = filtered.filter(
        (todo) => todo.title.toLowerCase().includes(query.toLowerCase()),
      );

      setFilteredTodos(filtered);
    };

    filterTodos();
  }, [allTodos, query, selectOption]);

  return (
    <TodosContext.Provider value={{
      allTodos,
      setAllTodos,
      isLoading,
      setIsLoading,
      query,
      setQuery,
      filteredTodos,
      setFilteredTodos,
      selectOption,
      setSelectOption,
      selectTodo,
      setSelectTodo,
      user,
      setUser,
      isLoadingModal,
      setIsLoadingModal,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
