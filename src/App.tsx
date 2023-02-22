import React, {
  useEffect, useMemo, useState, useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { TodoList } from './components/TodoList';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(todoFromServer => setTodos(todoFromServer));
  }, []);

  const filteredAndSortedTodos = useMemo(() => {
    return todos.filter(todo => {
      const filteredBySearchQuery = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      switch (sortType) {
        case 'active':
          return !todo.completed && filteredBySearchQuery;

        case 'completed':
          return todo.completed && filteredBySearchQuery;

        case 'all':
        default:
          return filteredBySearchQuery;
      }
    });
  }, [sortType, todos, searchQuery]);

  const onSearchQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    [],
  );

  const reset = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                onSearchQueryChange={onSearchQueryChange}
                resetSearchQuery={reset}
                sortType={sortType}
                setSortType={setSortType}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredAndSortedTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
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
