import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader/Loader';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getFilteredTodos } from './components/utils/getFilteredTodos';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = getFilteredTodos(todos, { status, query });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && todos.length === 0 && (
                <p className="title is-5">There are no todos</p>
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
