/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterOptions } from './types/FilterOptions';
import { getTodos } from './api';
import { Todo } from './types/Todo';

function getFilteredTodos(
  todos: Todo[],
  filterOption: FilterOptions,
  query: string,
): Todo[] {
  const normalizedQuery = query.toLowerCase().trim();

  let filteredTodos: Todo[] = todos.filter(todo => {
    switch (filterOption) {
      case FilterOptions.Active:
        return !todo.completed;

      case FilterOptions.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  filteredTodos = filteredTodos.filter(todo => {
    const normalisedTodoTitle = todo.title.toLowerCase().trim();

    return normalisedTodoTitle.includes(normalizedQuery);
  });

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState<FilterOptions>(
    FilterOptions.All,
  );

  const handleSetFilterOption = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const option = event.target.value as FilterOptions;

    setFilterOption(option);
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .then(() => setIsLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(
    todosFromServer,
    filterOption,
    searchQuery,
  );

  const selectedTodo = filteredTodos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSetFilterOption={handleSetFilterOption}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodoId={setSelectedTodoId} />
      )}
    </>
  );
};
