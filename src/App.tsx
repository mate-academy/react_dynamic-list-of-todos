/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodosStatus } from './types/TodosStatus';
import { Filter } from './types/Filter';
import { DEFAULT_FILTER } from './constants/constants';

function getFilteredTodos(todos: Todo[], filter: Filter): Todo[] {
  let filteredTodos = todos.filter(todo => {
    switch (filter.option) {
      case TodosStatus.Active:
        return !todo.completed;
      case TodosStatus.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  if (filter.query) {
    filteredTodos = filteredTodos
      .filter(({ title }) => title.toLowerCase()
        .includes(filter.query.toLowerCase()));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateFilter = (currentFilter: Filter) => {
    setFilter(currentFilter);
  };

  const handlerCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter updateFilter={updateFilter} />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
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
          handlerCloseModal={handlerCloseModal}
        />
      )}
    </>
  );
};
