import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [loadedTodos, setLoadedTodos] = useState<Todo[]>([] as Todo[]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  const handleSelectTodo = (todo: Todo | null) => setActiveTodo(todo);
  const handleSetFilter = (arg: string) => setFilter(arg);
  const handleSetQuery = (arg: string) => setQuery(arg);

  useEffect(() => {
    getTodos()
      .then(setLoadedTodos);
  }, []);

  const visibleTodos = loadedTodos.filter(({
    title,
    completed,
  }) => {
    const isMatchingQuery = title.toLowerCase()
      .includes(query.toLowerCase());

    const filters: Filters = {
      all: true,
      completed,
      active: !completed,
    };

    return isMatchingQuery && filters[filter];
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleSetFilter={handleSetFilter}
                handleSetQuery={handleSetQuery}
              />
            </div>

            <div className="block">
              {!loadedTodos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  activeTodo={activeTodo}
                  selectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          selectTodo={handleSelectTodo}
        />
      )}
    </>
  );
};
