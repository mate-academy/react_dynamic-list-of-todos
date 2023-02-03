/* eslint-disable max-len */
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilterChange] = useState('all');

  useEffect(() => {
    getTodos()
      .then((loadedTodos) => setTodos(loadedTodos));
  }, []);

  const closeModal = useCallback(() => (
    setSelectedTodoId(0)
  ), []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const visibleTodos = todos.filter(todo => {
    const isSearchQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    let isSearchBySelect;

    switch (filter) {
      case Filter.COMPLETED:
        isSearchBySelect = todo.completed;
        break;

      case Filter.ACTIVE:
        isSearchBySelect = !todo.completed;
        break;

      case Filter.All:
        return isSearchQuery;

      default:
        break;
    }

    return isSearchQuery && isSearchBySelect;
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
                setQuery={setQuery}
                filter={filter}
                filterChange={setFilterChange}
              />
            </div>

            <div className="block">
              {visibleTodos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectTodoId={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            closeModal={closeModal}
          />
        )}
    </>
  );
};
