import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { ForFilteredTodos, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { forFilteredTodos } from './components/helper';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<ForFilteredTodos>(
    ForFilteredTodos.all,
  );

  useEffect(() => {
    getTodos()
      .then((response) => {
        setTodos(response);
      })
      .catch((error) => {
        throw new Error(`Error:${error}`);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    return forFilteredTodos(todos, query, selectedFilter);
  }, [todos, query, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                getSetQuery={setQuery}
                selectedFilter={selectedFilter}
                getSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    getSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            todo={selectedTodo}
            getSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
