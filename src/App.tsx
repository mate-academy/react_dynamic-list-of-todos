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

function getPreparedTodos(todos: Todo[], showOnly: string, query: string) {
  let preparedTodos = [...todos];

  if (query.length !== 0) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (showOnly) {
    case 'all':
      return preparedTodos;

    case 'active':
      return preparedTodos.filter(todo => !todo.completed);

    case 'completed':
      return preparedTodos.filter(todo => todo.completed);

    default:
      throw new Error('Error');
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [showOnly, setShowOnly] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(error => setErrorMessage(error))
      .finally(() => setLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(
    () => getPreparedTodos(todos, showOnly, query),
    [todos, showOnly, query],
  );

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
                setShowOnly={setShowOnly}
              />
            </div>

            {errorMessage ? (
              <p className="notification is-danger">{`${errorMessage} todos. Try again later.`}</p>
            ) : (
              <div className="block">
                {loadingTodos && <Loader />}
                {!loadingTodos && (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    selectTodo={todo => setSelectedTodo(todo)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
