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
import { Filter } from './types/Filter';

function getVisibleTodos(todos: Todo[], query: string, filter: string) {
  let preparedTodos = [...todos];
  const normalizedQuery = query.toLowerCase().trim();

  if (query) {
    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  switch (filter) {
    case Filter.ALL:
    default:
      return preparedTodos;

    case Filter.COMPLETED:
      return preparedTodos.filter(todo => todo.completed);

    case Filter.ACTIVE:
      return preparedTodos.filter(todo => todo.completed === false);
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => setErrorMessage(`Error ${error.message}. Please try again`))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, filter)
  ), [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading && !errorMessage ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={todo => setSelectedTodo(todo)}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
      {errorMessage && (
        <div className="section">
          <div className="container">
            <div className="box message is-danger">
              <h1 className="message-header">
                {errorMessage}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
