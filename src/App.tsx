/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setTodosLoading] = useState<boolean>(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(newTodos => {
        setTodos(newTodos);
      })
      .catch(() => {
        setTodos([]);
      })
      .finally(() => {
        setTodosLoading(false);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && todo.completed === false) ||
      (status === 'completed' && todo.completed === true);

    return matchesQuery && matchesStatus;
  });

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
                onQueryChange={setQuery}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  onTodoItemClick={setSelectedTodo}
                  selectedTodo={selectedTodo}
                  todos={visibleTodos}
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
