/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { FilterOption } from './enums/FilterOptions';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterOption, setFilterOption] = useState<FilterOption>(FilterOption.All);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(false);
      })
      .catch(() => {
        throw new Error('Todos loading is failed');
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(({ title, completed }) => {
      const searchQuery = (
        title.toLowerCase().includes(query.trim().toLowerCase())
      );

      switch (filterOption) {
        case FilterOption.Active:
          return !completed && searchQuery;
        case FilterOption.Completed:
          return completed && searchQuery;
        default:
          return searchQuery;
      }
    });
  }, [todos, filterOption, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  showTodo={(todo) => {
                    setSelectedTodo(todo);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeModal={() => {
            setSelectedTodo(null);
          }}
        />
      )}
    </>
  );
};
