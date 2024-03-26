/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { Status } from './types/Status';

import { getTodos } from './api';

function getFilteredTodos(
  allTodos: Todo[],
  selectedOption: Status,
  query: string,
): Todo[] {
  let filteredTodos = [...allTodos];

  if (query) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (selectedOption) {
    case Status.active:
      return filteredTodos.filter(({ completed }) => !completed);

    case Status.completed:
      return filteredTodos.filter(({ completed }) => completed);

    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<Status>(Status.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState('');

  const visibleTodos = getFilteredTodos(todos, selectedOption, query);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(error => {
        console.error('Error fetching todos:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSetOption = (option: Status) => setSelectedOption(option);

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
