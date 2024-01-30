/* eslint-disable max-len */
import React, { useContext, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodosContext } from './contexts/TodoProvider';
import { FilterOptions } from './types/FilterOptions';
import { FilterStatus } from './types/FilterStatus';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

function filterTodos(todos: Todo[], { query, status }: FilterOptions) {
  let filteredTodos = [];

  switch (status) {
    case FilterStatus.Active:
      filteredTodos = todos.filter(({ completed }) => !completed);
      break;
    case FilterStatus.Completed:
      filteredTodos = todos.filter(({ completed }) => completed);
      break;
    default:
      filteredTodos = [...todos];
      break;
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    filteredTodos = filteredTodos
      .filter(({ title }) => title.toLowerCase().includes(normalizedQuery));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const {
    todos,
    filterOptions: { query, status },
    selectedTodo,
  } = useContext(TodosContext);
  const filteredTodos = useMemo(
    () => filterTodos(todos, { query, status }),
    [todos, query, status],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length
                ? <TodoList todos={filteredTodos} />
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (<TodoModal />)}
    </>
  );
};
