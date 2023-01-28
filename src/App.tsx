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

export enum FilterOption {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterOption, setFilterOption] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        throw new Error('Todos loading is failed');
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const searchQuery = (
        todo.title.toLowerCase().includes(query.trim().toLowerCase())
      );

      switch (filterOption) {
        case FilterOption.Active:
          return todo.completed === false && searchQuery;
        case FilterOption.Completed:
          return todo.completed === true && searchQuery;
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
              {todos.length > 0 ? (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  showTodo={(todo) => {
                    setSelectedTodo(todo);
                  }}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
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
