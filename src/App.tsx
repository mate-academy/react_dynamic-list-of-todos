/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { FilterOptions, Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

function preparedTodos(
  todos: Todo[],
  filterOption: FilterOptions,
  query: string,
) {
  let newTodos = todos.filter(todo => {
    switch (filterOption) {
      case FilterOptions.Active:
        return !todo.completed;
      case FilterOptions.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  if (query) {
    newTodos = newTodos.filter(todo => todo.title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  return newTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<FilterOptions>(FilterOptions.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = preparedTodos(todos, selectedOption, query);

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
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
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
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
