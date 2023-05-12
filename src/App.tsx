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
import { Statuses } from './types/Common';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [areTodosLoaded, setAreTodosLoaded] = useState(false);

  const [status, setStatus] = useState<Statuses>(Statuses.ALL);
  const [query, setQuery] = useState('');

  const visibleTodos = useMemo(() => {
    return todos.filter(({ title, completed }: Todo) => {
      const lowerCasedQuery = query.toLowerCase().trim();
      const lowerCasedTodoTitle = title.toLowerCase();

      let isCorrectStatus;

      switch (status) {
        case Statuses.ACTIVE:
          isCorrectStatus = !completed;
          break;

        case Statuses.COMPLETED:
          isCorrectStatus = completed;
          break;

        default:
          isCorrectStatus = true;
      }

      return lowerCasedTodoTitle.includes(lowerCasedQuery) && isCorrectStatus;
    });
  }, [todos, status, query]);

  const handleModalClose = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    getTodos().then((fetchedTodos: Todo[]) => {
      setTodos(fetchedTodos);

      setAreTodosLoaded(true);
    });
  }, []);

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
                onQueryChange={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {areTodosLoaded ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onTodoSelect={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
