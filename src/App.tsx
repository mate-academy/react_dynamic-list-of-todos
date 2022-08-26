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
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [completedFilter, setCompletedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    getTodos().then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  const applySearchQuery = useCallback(
    debounce(setDebouncedSearchQuery, 1000),
    [debouncedSearchQuery],
  );

  const getFilterTodos = useCallback(
    (todoList: Todo[], inputQuery: string) => {
      if (!todoList.length) {
        return null;
      }

      const filteredTodos = todoList.filter((todo) => {
        const { title, completed } = todo;

        const isTitle = title.toLowerCase().includes(inputQuery.toLowerCase());

        switch (completedFilter) {
          case 'all':
            return isTitle;
          case 'active':
            return !completed && isTitle;
          case 'completed':
            return completed && isTitle;
          default:
            return todo;
        }
      });

      return filteredTodos;
    },
    [debouncedSearchQuery, completedFilter],
  );

  const filteredTodos = useMemo(
    () => getFilterTodos(todos, debouncedSearchQuery),
    [todos, debouncedSearchQuery, completedFilter],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                completedFilter={completedFilter}
                searchQuery={searchQuery}
                onFilter={setCompletedFilter}
                onSearchQuery={setSearchQuery}
                onAppliedSearchQuery={applySearchQuery}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}
              {filteredTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          selectedTodoId={selectedTodoId}
          todos={todos}
          onDeletedSelectedTodo={setSelectedTodoId}
        />
      )}
    </>
  );
};
