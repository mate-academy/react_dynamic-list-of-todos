import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredBy, setFilteredBy] = useState(FilterBy.all);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateAt, setUpdateAt] = useState(new Date());

  const filterTodos = () => {
    return todos.filter((todo) => {
      switch (filteredBy) {
        case FilterBy.active:
          return !todo.completed;
        case FilterBy.completed:
          return todo.completed;
        default:
          return true;
      }
    }).filter((todo) => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  };

  function reload() {
    setUpdateAt(new Date());
    setErrorMessage('');
  }

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, [updateAt]);

  const filteredTodos = filterTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilteredBy={setFilteredBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}

              {errorMessage && (
                <p className="notification is-danger">
                  {errorMessage}
                  <button type="button" onClick={reload}>
                    Reload
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={setSelectedTodo}
        />
      )}
    </>
  );
};
