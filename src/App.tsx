/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Options } from './types/Options';

import { getTodos } from './api';

function getFilteredTodos(
  allTodos: Todo[],
  selectedOption: Options,
  query: string,
): Todo[] {
  let filteredTodos = [...allTodos];

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (selectedOption) {
    case Options.active:
      return filteredTodos.filter(({ completed }) => !completed);

    case Options.completed:
      return filteredTodos.filter(({ completed }) => completed);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<Options>(Options.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setLoading] = useState(false);

  const [query, setQuery] = useState('');

  const visibleTodos = getFilteredTodos(todos, selectedOption, query);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleSetOption = (option: Options) => setSelectedOption(option);

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const resetSelectedTodo = () => {
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
                selectedOption={selectedOption}
                query={query}
                handleSetOption={handleSetOption}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
            {isLoading ? (
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
