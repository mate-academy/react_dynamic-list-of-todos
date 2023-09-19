/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoStatus } from './types/TodoStatus';
import { filterTodos } from './components/utils/filterTodos';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [selectFilter, setSelectFilter] = useState(TodoStatus.All);
  const [filterField, setFilterField] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(setVisibleTodos)
      .catch(() => {
        // eslint-disable-next-line
        console.log('Error loading todos')
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return filterTodos(visibleTodos, filterField, selectFilter);
  }, [filterField, selectFilter, visibleTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterField={filterField}
                setFilterField={setFilterField}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  selectTodo={selectTodo}
                  visibleTodos={filteredTodos}
                  setSelectTodo={setSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          setSelectTodo={setSelectTodo}
          selectTodo={selectTodo}
        />
      )}
    </>
  );
};
