/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

const getVisibleTodos = (todos: Todo[], query: string, status: Status) => {
  const normalizedQuery = query.trim().toLowerCase();

  return todos
    .filter(todo => {
      switch (status) {
        case Status.Completed:
          return todo.completed;

        case Status.Active:
          return !todo.completed;

        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      //eslint-disable-next-line no-console
      .catch(error => console.warn(error))
      .finally(() => setLoading(false));
  }, []);

const visibleTodos = useMemo(()=> {
  return getVisibleTodos(todos, query, status)
}, [todos, query, status])

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
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          close={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};
