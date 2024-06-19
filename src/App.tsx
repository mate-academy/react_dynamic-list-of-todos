/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusSelect, setStatusSelect] = useState(Status.all);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered = todos;
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    if (statusSelect !== Status.all) {
      filtered = filtered.filter(todo =>
        statusSelect === Status.completed ? todo.completed : !todo.completed,
      );
    }

    return filtered;
  }, [todos, query, statusSelect]);

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatusSelect={setStatusSelect}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={closeModal} />
      )}
    </>
  );
};
