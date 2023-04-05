/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

const getVisibleTodos = (
  todos: Todo[],
  sortType: string,
  query: string,
): Todo[] => {
  let filtered = todos;

  if (sortType === 'active') {
    filtered = todos.filter(todo => !todo.completed);
  }

  if (sortType === 'completed') {
    filtered = todos.filter(todo => todo.completed);
  }

  return filtered.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = getVisibleTodos(todos, filter, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isError && (
                <p className="box has-background-danger-light has-text-danger">
                  Something went wrong
                </p>
              )}

              {isLoading ? (
                <Loader />
              ) : !isError && (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== null && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
