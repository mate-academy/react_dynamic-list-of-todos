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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState(0);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const selectTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodo)
  ), [selectedTodo]);

  const closeModal = useCallback(() => (
    setSelectedTodo(0)
  ), []);

  const visibleTodos = todos.filter(todo => {
    const isSearchQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    let isSearchBySelect;

    switch (filter) {
      case 'completed':
        isSearchBySelect = todo.completed;
        break;

      case 'active':
        isSearchBySelect = !todo.completed;
        break;

      case 'all':
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
                filter={filter}
                query={query}
                filterChange={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    selectTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo
        && (
          <TodoModal
            todo={selectTodo}
            closeModal={closeModal}
          />
        )}
    </>
  );
};
