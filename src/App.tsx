/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actualFilters, setActualFilters] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [todoModal, setTodoModal] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Failed to load user');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getVisibleTodos = (array: Todo[], filter: string, query: string) => {
    return array.filter(todo => {
      const matchesStatus =
        filter === 'all' ||
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  };

  const visibleTodos = getVisibleTodos(todos, actualFilters, filterQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                actualFilters={actualFilters}
                setActualFilters={setActualFilters}
                setFilterQuery={setFilterQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                error ? (
                  'Failed to load user'
                ) : (
                  <Loader />
                )
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setTodoModal={setTodoModal}
                  selectedTodo={todoModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!todoModal && (
        <TodoModal todo={todoModal} setTodoModal={setTodoModal} />
      )}
    </>
  );
};
