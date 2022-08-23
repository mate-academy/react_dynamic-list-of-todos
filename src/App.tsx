/* eslint-disable max-len */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { debounce } from 'lodash';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    getTodos().then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const applySearchQuery = useCallback(debounce(setDebouncedSearchQuery, 1000), [
    debouncedSearchQuery,
  ]);

  const filterTodos = useCallback(
    (todoList: Todo[], inputQuery: string) => {
      if (!todoList.length) {
        return null;
      }

      const filteredTodos = todoList.filter((todo) => {
        const { title, completed } = todo;

        const isTitle = title
          .toLowerCase()
          .includes(inputQuery.toLowerCase());

        switch (filter) {
          case 'all':
            return isTitle;
          case 'active':
            return !completed && isTitle;
          case 'completed':
            return completed && isTitle;
          default:
            return todo;
        }
      })

      return filteredTodos;
    },
    [debouncedSearchQuery, filter],
  );

  const getFilteredTodos = useMemo(
    () => filterTodos(todos, debouncedSearchQuery),
    [todos, debouncedSearchQuery, filter],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                searchQuery={searchQuery}
                onFilter={setFilter}
                onSearchQuery={setSearchQuery}
                onAppliedSearchQuery={applySearchQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              {getFilteredTodos && (
                <TodoList
                  todos={getFilteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onDeletedSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
