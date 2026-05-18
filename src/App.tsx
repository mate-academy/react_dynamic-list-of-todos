/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './components/TodoFilter';

const getFilteredTodos = (
  todos: Todo[],
  { query, status }: { query: string; status: Status },
) => {
  let filteredTodos = todos;
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery !== '') {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (status !== Status.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case Status.Active:
          return todo.completed === false;

        case Status.Completed:
          return todo.completed === true;

        default:
          throw new Error('Missing case in getFilteredTodos completed status');
      }
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>(Status.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      // .catch()
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = getFilteredTodos(todos, { query, status });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                setQuery={setQuery}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
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

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => {
            setSelectedTodo(null);
          }}
        />
      )}
    </>
  );
};
