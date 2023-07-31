import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleModal, setVisibleModal] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Status>(Status.ALL);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const visibleTodos = useMemo(() => {
    const currentTodos = query === '' ? todos : todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    switch (filter) {
      case Status.ALL:
        return currentTodos;

      case Status.ACTIVE:
        return currentTodos.filter(todo => !todo.completed);

      case Status.COMPLETED:
        return currentTodos.filter(todo => todo.completed);

      default:
        return currentTodos;
    }
  }, [filter, query, todos]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => new Error(error.message))
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
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  visibleTodos={visibleTodos}
                  visibleModal={visibleModal}
                  setVisibleModal={setVisibleModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {visibleModal && (
        <TodoModal
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
        />
      )}
    </>
  );
};
