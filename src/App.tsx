/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { debounce, filterTodosByStatus } from './types/Helpers/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isTodoCompleted, setIsTodoComlpeted] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(allTodos => setTodos(allTodos))
      .finally(() => setIsLoading(false));
  }, []);

  let visibleTodos = [...todos];

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 500),
    [],
  );

  useMemo(() => {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(appliedQuery));
  }, [appliedQuery]);

  if (isTodoCompleted === 'completed') {
    visibleTodos = filterTodosByStatus(visibleTodos, true);
  }

  if (isTodoCompleted === 'active') {
    visibleTodos = filterTodosByStatus(visibleTodos, false);
  }

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
                applyQuery={applyQuery}
                isTodoCompleted={isTodoCompleted}
                setIsTodoComlpeted={setIsTodoComlpeted}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={visibleTodos}
                setSelectedTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        )}
    </>
  );
};
