/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoFilterTypes } from './types/TodoFilterTypes';

const getFilteredTodos = (
  todos: Todo[],
  query: string,
  selectedFilter: TodoFilterTypes,
) => {
  let todosClone = [...todos];

  if (selectedFilter !== TodoFilterTypes.All) {
    todosClone = todosClone.filter(({ completed }) => {
      switch (selectedFilter) {
        case TodoFilterTypes.Active:
          return !completed;

        case TodoFilterTypes.Completed:
          return completed;

        default:
          throw new Error('Something went wrong :(');
      }
    });
  }

  if (query) {
    todosClone = todosClone.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return todosClone;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<TodoFilterTypes>(TodoFilterTypes.All);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, query, selectedFilter);
  }, [todos, query, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                selectedFilter={selectedFilter}
                onSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && filteredTodos.length > 0 && ((
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                />
              )
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
