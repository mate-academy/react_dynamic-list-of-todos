/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Select } from './types/Select';
import { preperedTodos } from './helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<Select>(Select.DEFAULT);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(error => error.message)
      .finally(() => setIsLoading(true));
  }, []);

  const handleSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleSelectFilter = (status: Select) => {
    setSelectedFilter(status);
  };

  const handleSetQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const visibleTodos = useMemo(() => {
    return preperedTodos(todos, query, selectedFilter);
  }, [query, selectedFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedFilter={selectedFilter}
                handleSelectFilter={handleSelectFilter}
                handleSetQuery={handleSetQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <TodoList
                  todos={visibleTodos}
                  handleSelectedTodo={handleSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
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
