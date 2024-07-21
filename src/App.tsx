/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FILTER_BY } from './constants/FilterBy';
import { FilterParams } from './types/FilterParams';
import { User } from './types/User';

const prepareVisibleTodos = (
  todos: Todo[],
  { filterBy, query }: FilterParams,
) => {
  let visisbleTodos = [...todos];
  const normilizeQuery = query.trim().toLowerCase();

  if (query) {
    visisbleTodos = visisbleTodos.filter(todo =>
      todo.title.toLowerCase().includes(normilizeQuery),
    );
  }

  switch (filterBy) {
    case FILTER_BY.ACTIVE:
      return visisbleTodos.filter(todo => todo.completed === false);
    case FILTER_BY.COMPLETED:
      return visisbleTodos.filter(todo => todo.completed === true);
    default:
      return visisbleTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState(FILTER_BY.ALL);
  const [query, setQuery] = useState('');
  const [hasLoader, setHasLoader] = useState(false);
  const [choosenTodo, setChoosenTodo] = useState<Todo | null>(null);
  const [choosenUser, setChoosenUser] = useState<User | null>(null);

  const visibleTodos = useMemo(() => {
    return prepareVisibleTodos(todos, { filterBy, query });
  }, [todos, filterBy, query]);

  useEffect(() => {
    setHasLoader(true);
    getTodos()
      .then(setTodos)
      .catch(error => error)
      .finally(() => setHasLoader(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filterBy}
                onFilter={setFilterBy}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {hasLoader && <Loader />}

              {!hasLoader && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={choosenTodo}
                  onSelect={setChoosenTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {choosenTodo && (
        <TodoModal
          todo={choosenTodo}
          onTodo={setChoosenTodo}
          user={choosenUser}
          onUser={setChoosenUser}
        />
      )}
    </>
  );
};
