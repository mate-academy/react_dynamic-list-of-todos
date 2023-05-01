import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [visibleTodo, setVisibleTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<Filter | string>(Filter.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setVisibleTodos(todosFromServer);
      });
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    return visibleTodos.filter(({ title, completed }) => {
      const preparedQuery = query.trim().toLowerCase();
      const filterByQuery
        = title.toLowerCase().includes(preparedQuery);

      switch (filterBy) {
        case Filter.ACTIVE:
          return !completed && filterByQuery;

        case Filter.COMPLETED:
          return completed && filterByQuery;

        default:
          return filterByQuery;
      }
    });
  }, [query, visibleTodos, filterBy]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!visibleTodos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  visibleTodo={visibleTodo}
                  setVisibleTodo={setVisibleTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {visibleTodo && (
        <TodoModal
          visibleTodo={visibleTodo}
          setVisibleTodo={setVisibleTodo}
        />
      )}
    </>
  );
};
