/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoState } from './types/TodoState';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filterOption, setFilterOption] = useState<TodoState>(TodoState.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = (() => {
    const newTodos = todos.filter(todo => {
      const matchesFilter = (() => {
        switch (filterOption) {
          case TodoState.completed:
            return todo.completed;
          case TodoState.active:
            return !todo.completed;
          default:
            return true;
        }
      })();

      const matchesQuery = todo.title
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

      return matchesFilter && matchesQuery;
    });

    return newTodos;
  })();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterOption={setFilterOption}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />
      )}
    </>
  );
};
