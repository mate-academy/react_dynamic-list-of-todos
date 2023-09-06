/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/StatusEnum';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setLoading(false));
    }, 500);
  }, []);

  const visibleTodos = useMemo(() => {
    if (status === Status.All && query === '') {
      return todos;
    }

    return todos.filter(todo => {
      const isCompleted = status === Status.Completed ? todo.completed : true;
      const isActive = status === Status.Active ? !todo.completed : true;
      const matchQuery = query ? todo.title.toLowerCase().includes(query.toLowerCase()) : true;

      return isCompleted && isActive && matchQuery;
    });
  }, [todos, status, query]);

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
                onQueryChange={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      ) }
    </>
  );
};
