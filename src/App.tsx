/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import debounce from 'lodash.debounce';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { prepareTodos } from './utils/prepareTodos';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [sortType, setSortType] = useState(SortType.ALL);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const fetchedTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchedTodos();
  }, []);

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const handleHideTodo = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleSetSortType = useCallback((event: string) => {
    setSortType(event as SortType);
  }, []);

  const handleSetQuery = useCallback((event: string) => {
    setQuery(event);
    applyQuery(event);
  }, []);

  const handleClearQuery = useCallback(() => {
    setQuery('');
    setAppliedQuery('');
  }, []);

  const visibleTodo = useMemo(() => (
    prepareTodos(todos, appliedQuery, sortType)),
  [todos, appliedQuery, sortType]);

  if (hasError) {
    return (<span>Sorry, no todos at this moment</span>);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortType={sortType}
                onSortTodos={handleSetSortType}
                onQuery={handleSetQuery}
                query={query}
                onClear={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={visibleTodo}
                    onSelectTodo={handleSelectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal onHideTodo={handleHideTodo} todo={selectedTodo} />
      )}
    </>
  );
};
