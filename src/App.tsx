/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { SelectStatus } from './types/selectStatus';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedStatus, setSelectedStatus] = useState(SelectStatus.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todos => setTodosFromServer(todos))
      .catch(() => setErrorMessage('Try again later!'))
      .finally(() => setLoading(false));
  }, []);

  const getFilteredTodos = (todos: Todo[]) => {
    let filteredTodos = [...todos];
    const normalisedQuery = query.toLowerCase().trim();

    if (normalisedQuery) {
      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(normalisedQuery),
      );
    }

    switch (selectedStatus) {
      case SelectStatus.active:
        return filteredTodos.filter(todo => !todo.completed);

      case SelectStatus.completed:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedStatus={setSelectedStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {
                !loading && !errorMessage && todosFromServer.length > 0
                && (
                  <TodoList
                    todos={getFilteredTodos(todosFromServer)}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )
              }

              {errorMessage && (
                <p className="notification is-danger has-text-centered">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {
        selectedTodo && (
          <TodoModal
            setSelectedTodo={setSelectedTodo}
            selectedTodo={selectedTodo}
          />
        )
      }
    </>
  );
};
