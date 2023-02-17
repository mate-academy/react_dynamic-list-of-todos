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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasError, setHasError] = useState(false);

  const [sortType, setSortType] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const fetchedTodos = async () => {
    try {
      const data = await getTodos();

      setTodos(data);
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
    setSortType(event);
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

            {hasError
              ? (
                <span>Sorry, no todos at this moment</span>
              )
              : (
                <div className="block">
                  {todos.length === 0
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
              )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal onHideTodo={handleHideTodo} todo={selectedTodo} />
      )}
    </>
  );
};
