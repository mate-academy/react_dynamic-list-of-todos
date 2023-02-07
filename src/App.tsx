/* eslint-disable no-console */
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
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(setAllTodos)

      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const trimmed = query.toLocaleLowerCase().trim();

  const visibleTodos = allTodos
    .filter((todo) => {
      const title = todo.title.toLocaleLowerCase();

      return title.includes(trimmed);
    })
    .filter((todo) => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filter}
                onSetQuery={setQuery}
                onSetSelectedFilter={setSelectedFilter}
              />
            </div>
            <div className="block">
              {isLoading
                ? (
                  <Loader />
                )
                : (
                  <TodoList
                    todos={visibleTodos}
                    onSetSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />

                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSetSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
