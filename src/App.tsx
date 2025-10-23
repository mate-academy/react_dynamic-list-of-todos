/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilteredBy } from './types/FilteredBy';

type GetFilteredTodosProps = {
  search: string;
  filteredBy: FilteredBy;
};

function getFilteredTodos(
  todos: Todo[],
  { search, filteredBy }: GetFilteredTodosProps,
): Todo[] {
  let filteredTodos = [...todos];

  const normalizedSearch = search.toLowerCase().trim();

  if (normalizedSearch) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedSearch),
    );
  }

  if (filteredBy === FilteredBy.Active) {
    filteredTodos = filteredTodos.filter(todo => todo.completed === false);
  }

  if (filteredBy === FilteredBy.Completed) {
    filteredTodos = filteredTodos.filter(todo => todo.completed === true);
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredBy, setFilteredBy] = useState<FilteredBy>(FilteredBy.All);

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error('Failed to load');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, { search, filteredBy });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={search}
                onSearch={setSearch}
                filteredBy={filteredBy}
                onFilteredBy={setFilteredBy}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowModal={setShowModal}
                  onSetCurrentTodo={setCurrentTodo}
                  currentTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && currentTodo && (
        <TodoModal
          currentTodo={currentTodo}
          onSetCurrentTodo={setCurrentTodo}
          onShowModal={setShowModal}
        />
      )}
    </>
  );
};
