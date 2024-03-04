/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

function getFilteredTodos(
  allTodos: Todo[],
  { selectedOption, query }: { [key: string]: string },
): Todo[] {
  let filteredTodos = [...allTodos];

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (selectedOption) {
    case 'active':
      return filteredTodos.filter(({ completed }) => completed === false);

    case 'completed':
      return filteredTodos.filter(({ completed }) => completed);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, { selectedOption, query }),
    [todos, selectedOption, query],
  );

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleSetOption = useCallback(
    (option: string): void => setSelectedOption(option),
    [],
  );

  const handleSetQuery = useCallback(
    (text: string): void => setQuery(text),
    [],
  );

  const selectTodo = useCallback((todo: Todo): void => {
    setSelectedTodo(todo);
  }, []);

  const resetSelectedTodo = useCallback((): void => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedOption={selectedOption}
                query={query}
                handleSetOption={handleSetOption}
                handleSetQuery={handleSetQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} reset={resetSelectedTodo} />
      )}
    </>
  );
};
