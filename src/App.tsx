/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { debounce } from './components/helpers/debounce';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setTodos([]));
  }, []);

  const closeModal = useCallback(() => (
    setSelectedTodoId(0)
  ), []);

  const debounceQuery = useCallback((
    debounce(setDebouncedQuery, 1000)
  ), []);

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    debounceQuery(value);
  }, []);

  const visibleTodos = useMemo(() => {
    if (debouncedQuery || filter !== 'all') {
      return todos.filter(todo => {
        const normalizedTitle = todo.title.toLowerCase();
        const normalizedQuery = debouncedQuery.toLowerCase().trim();
        const isQueryMatchTitle = normalizedTitle.includes(normalizedQuery);

        switch (filter) {
          case 'completed':
            return todo.completed && isQueryMatchTitle;

          case 'active':
            return !todo.completed && isQueryMatchTitle;

          default:
            return todo && isQueryMatchTitle;
        }
      });
    }

    return todos;
  }, [todos, filter, debouncedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onFilterChange={setFilter}
                onQueryChange={handleInputChange}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelectTodo={setSelectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onCloseModal={closeModal}
          />
        )}
    </>
  );
};
