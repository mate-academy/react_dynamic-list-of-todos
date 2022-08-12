/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const filterByStatus = (todos: Todo[], method: string) => {
  if (method === 'all') {
    return todos;
  }

  return todos.filter(todo => (method === 'active'
    ? !todo.completed
    : todo.completed));
};

const filterByTitle = (todos: Todo[], query: string) => {
  if (query === '') {
    return todos;
  }

  return todos.filter(
    todo => todo.title.toLowerCase().includes(query.toLowerCase()),
  );
};

const bebounce = (f: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterMethod, setFilterMethod] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(loadedTodos => setTodos(loadedTodos));
  }, []);

  const visibleTodos = filterByTitle(
    filterByStatus(todos, filterMethod),
    appliedQuery,
  );

  const applyQuery = useCallback(bebounce(setAppliedQuery, 1000), []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setFilterMethod}
                onInput={setQuery}
                onInputApplied={applyQuery}
                onCancel={setAppliedQuery}
                query={query}
              />
            </div>

            <div className="block">
              {visibleTodos.length ? (
                <TodoList
                  todos={visibleTodos}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onX={setSelectedTodo} />
      )}
    </>
  );
};
