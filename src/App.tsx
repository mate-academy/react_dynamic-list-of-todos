/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  let filteredTodos: Todo[] = todos;

  switch (filter) {
    case 'all':
      filteredTodos = todos;

      break;

    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed === true);

      break;

    case 'active':
      filteredTodos = todos.filter(todo => todo.completed === false);

      break;

    default: {
      break;
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList todos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
