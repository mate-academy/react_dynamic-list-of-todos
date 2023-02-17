/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { SortBy } from './types/SortBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.All);

  const selectTodo = useCallback((todo: Todo | null) => {
    setSelectedTodo(todo);
  }, []);

  const filterTodos = () => {
    const todosByQuery = todos.filter(({ title }) => {
      const loweredQuery = query.toLowerCase();
      const loweredTitle = title.toLowerCase();

      return loweredTitle.includes(loweredQuery);
    });

    return todosByQuery.filter(({ completed }) => {
      switch (sortBy) {
        case SortBy.Completed:
          return completed;

        case SortBy.Active:
          return !completed;

        default:
          return true;
      }
    });
  };

  useEffect(() => {
    const getTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
        setIsLoaded(true);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Error: todos could not be loaded');
      }
    };

    getTodosFromServer();
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
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            <div className="block">
              {isLoaded
                ? (
                  <TodoList
                    todos={filterTodos()}
                    selectedTodo={selectedTodo}
                    onSelect={selectTodo}
                  />
                ) : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleClose={() => selectTodo(null)}
        />
      )}
    </>
  );
};
