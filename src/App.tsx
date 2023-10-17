/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(Filters.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos: Todo[] = useMemo(() => {
    let filteredTodos = [...todos];

    if (query.trim()) {
      filteredTodos = filteredTodos.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (filtered) {
      case Filters.ACTIVE:
        return filteredTodos.filter(todo => todo.completed === false);

      case Filters.COMPLETED:
        return filteredTodos.filter(todo => todo.completed === true);

      default:
        return filteredTodos;
    }
  }, [query, filtered, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeSelect={setFiltered}
                onChangeInput={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
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
