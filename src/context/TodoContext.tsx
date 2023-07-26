import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
import { Context } from '../types/TodoContext';
import { FILTER } from '../types/filterEnum';
import { filterTodo } from '../helpers/filterTodos';

export const TodosContext = createContext<Context>({
  todos: [],
  isTodoLoading: false,
  toggleModal: () => {},
  isOpenModal: false,
  searchField: '',
  filterField: FILTER.ALL,
  onUpdateSearch: () => {},
  onUpdateFilter: () => {},
  currentTodo: null,
  updateCurrentTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchField, setSearchField] = useState('');
  const [filterField, setFilterField] = useState<FILTER>(FILTER.ALL);

  useEffect(() => {
    setIsTodoLoading(true);
    getTodos()
      .then((todo) => setTodos(todo))
      .finally(() => setIsTodoLoading(false));
  }, []);

  const toggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const onUpdateSearch = (term: string) => {
    setSearchField(term);
  };

  const onUpdateFilter = (term: FILTER) => {
    setFilterField(term);
  };

  const updateCurrentTodo = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const visibleTodo = filterTodo(todos, { searchField, filterField });

  const value = useMemo(
    () => ({
      todos: visibleTodo,
      isTodoLoading,
      toggleModal,
      isOpenModal,
      searchField,
      filterField,
      onUpdateSearch,
      onUpdateFilter,
      currentTodo,
      updateCurrentTodo,
    }),
    [todos, isTodoLoading, isOpenModal, searchField, filterField],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
