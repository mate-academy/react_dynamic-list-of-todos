/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

enum Filter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [loadingList, setLoadingList] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [activeTodo, setActiveTodo] = useState<Todo>({} as Todo);
  const isActiveTodo = Object.keys(activeTodo).length !== 0;

  const filterTodos = () => {
    const filtered = todos.filter(todo =>
      todo.title.includes(query.toLocaleLowerCase()),
    );

    switch (filter) {
      case Filter.all:
        return filtered;
      case Filter.active:
        return filtered.filter(todo => !todo.completed);
      case Filter.completed:
        return filtered.filter(todo => todo.completed);
      default:
        return filtered;
    }
  };

  const filteredTodos = useCallback(filterTodos, [filterTodos]);

  useEffect(() => {
    setLoadingList(true);

    getTodos()
      .then(setTodos)
      // .catch(() => console.error('Something went wrong!'))
      .finally(() => setLoadingList(false));
  }, []);

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
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loadingList ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos()}
                  setActiveTodo={setActiveTodo}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isActiveTodo && (
        <TodoModal activeTodo={activeTodo} setActiveTodo={setActiveTodo} />
      )}
    </>
  );
};
