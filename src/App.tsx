/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { FilteredOptions } from './types/FilteredOption';
import { getTodos } from './api';

function getFilteredTodos(
  todos: Todo[],
  selectedOption: FilteredOptions,
  query: string,
) {
  let filteredTodos = todos;

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  switch (selectedOption) {
    case FilteredOptions.Active:
      return filteredTodos.filter(todo => !todo.completed);
    case FilteredOptions.Completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<FilteredOptions>(
    FilteredOptions.All,
  );

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const preparedTodos = getFilteredTodos(todos, selectedOption, query);

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
                handleSetOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length && (
                <TodoList
                  todos={preparedTodos}
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
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};
