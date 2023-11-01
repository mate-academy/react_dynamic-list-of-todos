import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { prepareTodos } from './utils/prepareTodos';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo []>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [filter, setFilter] = useState(FilterType.All);
  const [query, setQuery] = useState('');

  const preparedTodos = prepareTodos(filter, query, todos);

  useEffect(() => {
    setTodosLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setTodosLoading(false));
  }, []);

  const handleFilterTypeChange = (newType: FilterType) => {
    setFilter(newType);
  };

  const handleFilterQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                type={filter}
                onTypeChange={handleFilterTypeChange}
                onQueryChange={handleFilterQueryChange}
              />
            </div>

            <div className="block">
              {todosLoading && <Loader />}
              {!todosLoading && (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  setSelectedUserId={setSelectedUserId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUserId={selectedUserId}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
