/* eslint-disable max-len */
import React, {
  useMemo, useEffect, useState, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos().then((todos) => setVisibleTodos(todos));
  }, []);

  const filteredTodos = useMemo(() => {
    return visibleTodos.filter((todo) => {
      const filteredByQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      switch (status) {
        case 'active':
          return !todo.completed && filteredByQuery;

        case 'completed':
          return todo.completed && filteredByQuery;

        case 'all':
        default:
          return filteredByQuery;
      }
    });
  }, [status, visibleTodos, query]);

  const onQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  const reset = useCallback(() => {
    setQuery('');
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
                onQueryChange={onQueryChange}
                resetQuery={reset}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {visibleTodos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
