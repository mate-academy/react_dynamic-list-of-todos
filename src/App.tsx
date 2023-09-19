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
import { Status } from './types/StatusState';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.all);
  const [query, setQuery] = useState('');

  const filteredTodos = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return todos.filter(todo => {
      switch (status) {
        case Status.active:
          return !todo.completed;
        case Status.completed:
          return todo.completed;
        default:
          return true;
      }
    })
      .filter(todo => {
        return todo.title.toLowerCase().includes(normalizedQuery);
      });
  }, [status, query, todos]);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(setTodos)
      .finally(() => {
        setIsLoading(false);
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
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelected={setSelectedTodo}
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
          onTodoSelected={setSelectedTodo}
        />
      )}
    </>
  );
};
