/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterType';
import { getFiltredTodos } from './helpers/getFiltredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(FilterType.NONE);
  const [titleFilter, setTitleFilter] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const selectedTodo = useMemo(() => {
    return todos.find(({ id }) => id === selectedTodoId) || null;
  }, [selectedTodoId]);

  const visibleTodos = useMemo(() => {
    return getFiltredTodos(todos, titleFilter, selectedFilter);
  }, [selectedFilter, titleFilter, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelectedFilterChange={(filterType) => setSelectedFilter(filterType)}
                selectedFilter={selectedFilter}
                onTitleFilterChange={(titlePart) => setTitleFilter(titlePart)}
                titleFilter={titleFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  onTodoSelect={(todoId) => setSelectedTodoId(todoId)}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodoId(0)} />
      )}
    </>
  );
};
