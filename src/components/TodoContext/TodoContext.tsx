import React, { useState, useCallback } from 'react';
import { getTodos } from '../../api';
import { SortTypes } from '../../types/SortTypes';
import { Todo } from '../../types/Todo';
import { debounce } from '../utils/debounce';

type Context = {
  todos: Todo[],
  sortType: SortTypes,
  query: string,
  appliedQuery: string,
  isLoaded: boolean,
  isError: boolean,

  getTodosFromServer: () => void,
  changeSortType: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  applyQuery: ((arg: string) => void),
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  clearSearchBar: () => void,
};

export const TodoContext = React.createContext<Context>({
  todos: [],
  sortType: SortTypes.ALL,
  query: '',
  appliedQuery: '',
  isLoaded: true,
  isError: false,

  getTodosFromServer: () => {},
  changeSortType: () => {},
  applyQuery: () => {},
  handleSearch: () => {},
  clearSearchBar: () => {},
});

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.ALL);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);

  async function getTodosFromServer() {
    try {
      const newTodos = await getTodos();

      setIsError(false);
      setIsLoaded(false);
      setTodos(newTodos);
    } catch {
      setIsError(true);
      setIsLoaded(false);
      throw new Error('Can\'t load list of todos');
    }
  }

  function changeSortType(event: React.ChangeEvent<HTMLSelectElement>) {
    const currentValue = event.target.value as SortTypes;

    setSortType(currentValue);
  }

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000),
    []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearSearchBar = () => {
    setQuery('');
    setAppliedQuery('');
  };

  const contextValue = {
    todos,
    sortType,
    query,
    appliedQuery,
    isLoaded,
    isError,

    getTodosFromServer,
    changeSortType,
    applyQuery,
    handleSearch,
    clearSearchBar,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
