/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilteredOptions } from './types/FilteredOptions';

function handleFilteredTodos(
  todos: Todo[],
  optionSelected: FilteredOptions,
  query: string,
) {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  switch (optionSelected) {
    case FilteredOptions.active:
      return filteredTodos.filter(todo => !todo.completed);
    case FilteredOptions.completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [optionSelected, setOptionSelected] = useState<FilteredOptions>(
    FilteredOptions.all,
  );

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setIsLoading(false));
  }, []);


  const preparedTodos = handleFilteredTodos(todosFromServer, optionSelected, query);
  const handleSetOption = (option: FilteredOptions) =>
    setOptionSelected(option);

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
                optionSelected={optionSelected}
                handleSetOption={handleSetOption}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todosFromServer.length > 0 && (
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
