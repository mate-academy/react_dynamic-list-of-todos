/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/Filter';
import { filteredTodos } from './functions/filteredTodos';
import { useLoading } from './hooks/useLoading';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { isLoading, startLoading, finishLoading } = useLoading();

  const visibleTodos = filteredTodos(todos, filter, query);

  const handleClickOfPost = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleChangeSelect = useCallback((newValue: FilterType) => {
    setFilter(newValue);
  }, []);

  useEffect(() => {
    startLoading();
    const fetchData = async () => {
      try {
        const repsonse = await getTodos();

        setTodos(repsonse);
      } finally {
        finishLoading();
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setQuery={setQuery}
                query={query}
                handleChangeSelect={handleChangeSelect}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  visibleTodos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleClickOfPost={handleClickOfPost}
        />
      )}
    </>
  );
};
