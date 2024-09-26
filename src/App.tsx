import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try Again Later'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const includesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    switch (status) {
      case Status.Active:
        return !todo.completed && includesQuery;
      case Status.Completed:
        return todo.completed && includesQuery;
      case Status.All:
      default:
        return includesQuery;
    }
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                onStatusChange={setStatus}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {errorMessage && <div>{errorMessage}</div>}

              {!isLoading && !errorMessage && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {!!selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
