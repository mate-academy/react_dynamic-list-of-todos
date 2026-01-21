/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo, TodoWithUser, TodoStatus } from './types/Todo';
import * as todoApi from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState<TodoStatus>('all');
  const [selectedTodoId, setSelectedTodoId] = React.useState<number | null>(
    null,
  );
  const [selectedTodo, setSelectedTodo] = React.useState<TodoWithUser | null>(
    null,
  );
  const [userLoading, setUserLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);

    todoApi
      .getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setLoading(false);
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.error('Failed to load todos', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedTodoId === null) {
      setSelectedTodo(null);
      setUserLoading(false);

      return;
    }

    const todo = todos.find(currentTodo => currentTodo.id === selectedTodoId);

    if (!todo) {
      return;
    }

    setUserLoading(true);
    setSelectedTodo(null);

    todoApi
      .getUser(todo.userId)
      .then(user => {
        setSelectedTodo({ ...todo, user });
        setUserLoading(false);
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.error('Failed to load user', error);
        setUserLoading(false);
      });
  }, [selectedTodoId, todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  const handleSelectTodo = (id: number | null) => {
    setSelectedTodoId(id);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
  };

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
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todo={selectedTodo}
          onClose={handleCloseModal}
          loading={userLoading}
        />
      )}
    </>
  );
};
