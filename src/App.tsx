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

const preparedTodos = (
  todos: Todo[],
  query: string,
  filteredBy: string,
) => {
  let copyTodos = [...todos];
  const normalizeQuary = query.trim().toLowerCase();

  if (query) {
    copyTodos = copyTodos.filter(todo => todo.title.toLowerCase().includes(normalizeQuary));
  }

  if (filteredBy) {
    copyTodos = copyTodos.filter(todo => {
      switch (filteredBy) {
        case 'all':
          return true;

        case 'active':
          return todo.completed === false;

        case 'completed':
          return todo.completed === true;

        default:
          return false;
      }
    });
  }

  return copyTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredBy, setFilteredBy] = useState('all');
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo(() => {
    return preparedTodos(todos, query, filteredBy);
  }, [todos, query, filteredBy]);

  useEffect(() => {
    setLoaded(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoaded(false));
  }, []);

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
                filteredBy={filteredBy}
                setFilteredBy={setFilteredBy}
              />
            </div>

            <div className="block">
              {loaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
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
    </>
  );
};
