/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [filterBy, setFilterBy] = useState(FilterBy.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setIsError('Cannot load Todos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCloseTodoInfo = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filterBy}
                onFilterBy={setFilterBy}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {(isLoading && !isError) && (
                <Loader />
              )}

              {(isError && !isLoading) && (
                { isError }
              )}

              {(!isError && !isLoading) && (
                <TodoList
                  todos={todos}
                  filter={filterBy}
                  query={query}
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
          onSelectedTodo={handleCloseTodoInfo}
        />
      )}
    </>
  );
};
