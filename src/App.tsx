/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './services/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('');

  const fetchTodos = (getTodosFn: () => Promise<Todo[]>) => {
    setLoading(true);
    getTodosFn()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Try again later');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);

    fetchTodos(() => getTodos(status, query));
  }, [status, query]);

  const handleSelectChange = (value: string) => {
    setStatus(value);
    fetchTodos(() => getTodos(value, query));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    fetchTodos(() => getTodos(status, value));
  };

  const handleClearInput = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                selectedValue={status}
                inputValue={query}
                onSelect={value => handleSelectChange(value)}
                onChange={value => handleInputChange(value)}
                onClearClick={handleClearInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {errorMessage && (
                <p className="notification is-danger">{errorMessage}</p>
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={todo => setSelectedTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClick={setSelectedTodo} />
      )}
    </>
  );
};
