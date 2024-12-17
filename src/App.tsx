/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo>();
  const [completedFilter, setCompletedFilter] = React.useState<string | null>(
    '',
  );
  const [query, setQuery] = React.useState('');

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const normalizedQuery = query.toLowerCase();

  const currentTodos = useMemo((): Todo[] => {
    const filteredTodos =
      completedFilter === 'active'
        ? todos.filter(todo => !todo.completed)
        : completedFilter === 'completed'
          ? todos.filter(todo => todo.completed)
          : todos;

    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery.toLowerCase()),
    );
  }, [todos, completedFilter, normalizedQuery]);

  const handleEyeButtonClick = useCallback(
    (todoId: number | null) => {
      if (typeof todoId === 'number') {
        setSelectedTodo(currentTodos.find(todo => todo.id === todoId));
      }
    },
    [currentTodos],
  );

  const closeModal = () => {
    setSelectedTodo(undefined);
  };

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
                completedFilter={completedFilter}
                setCompletedFilter={setCompletedFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={currentTodos}
                  onEyeButtonClick={handleEyeButtonClick}
                  todoWatched={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseModal={closeModal} />
      )}
    </>
  );
};
