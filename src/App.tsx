/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<string>('all');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState(new Date());

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Failed to load todos');
      });
  }, [updatedAt]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (status === 'all') {
        return todo.title.toLowerCase().includes(search.toLowerCase());
      }

      return (
        todo.title.toLowerCase().includes(search.toLowerCase()) &&
        todo.completed === (status === 'completed')
      );
    });
  }, [todos, search, status]);

  const reload = () => {
    setUpdatedAt(new Date());
    setErrorMessage('');
  };

  const getTodosListView = () => {
    if (todos.length === 0 && !errorMessage) {
      return <Loader />;
    }

    if (todos.length > 0) {
      return (
        <TodoList
          todos={filteredTodos}
          selectedTodo={selectedTodo}
          onSelect={setSelectedTodo}
        />
      );
    }

    if (errorMessage && todos.length === 0) {
      return (
        <div>
          <p>{errorMessage}</p>
          <button className="button is-danger" onClick={reload}>
            Reload
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSearch={setSearch}
                onStatusChange={setStatus}
                onClearSearch={() => setSearch('')}
              />
            </div>

            <div className="block">{getTodosListView()}</div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
