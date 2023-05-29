/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { SearchBy, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.all);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [todosLoading, setTodosLoading] = useState(true);

  const filter = (
    todos: Todo[],
    filterBy: SearchBy,
  ) => {
    let findTodos = [...todos];

    if (query) {
      const searchQuery = query.toLowerCase().trim();

      findTodos = findTodos.filter((todo) => todo.title.toLowerCase().includes(searchQuery));
    }

    findTodos = findTodos.filter(todo => {
      switch (filterBy) {
        case SearchBy.active:
          return !todo.completed;
        case SearchBy.completed:
          return todo.completed;
        case SearchBy.all:
        default:
          return todo;
      }
    });

    return findTodos;
  };

  const fetchGoods = () => (
    getTodos()
      .then((todo) => {
        setInitialTodos(todo);
        setTodosLoading(false);
      })
      .catch(() => {
        setError(true);
        setTodosLoading(false);
      }));

  useEffect(() => {
    fetchGoods();
  }, []);

  const filteredTodos = useMemo(() => {
    return filter(initialTodos, searchBy);
  }, [searchBy, initialTodos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                setQuery={setQuery}
                query={query}
              />
            </div>

            {todosLoading && <Loader />}

            {error ? (
              <p className="has-text-danger">
                An error occured when loading todos
              </p>
            ) : (
              <div className="block">
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              </div>
            )}
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
