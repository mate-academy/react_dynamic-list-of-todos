import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.All);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Something went wrong while fetching data.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case 'all': return todo;
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return todo;
    }
  });

  const visibleTodos = useMemo(() => {
    const lowerQuery = query.toLowerCase();

    return filteredTodos.filter(todo => {
      const isMatchQuery = todo.title.toLowerCase().includes(lowerQuery);

      return isMatchQuery;
    });
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              <h1>
                {error}
              </h1>
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          close={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
