/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getAllTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter, FilterField } from './types/Filter';

function getFilteredTodos(todos: Todo[], filter: Filter): Todo[] {
  let newTodos = todos.filter(todo => {
    switch (filter.filterField) {
      case FilterField.Active:
        return !todo.completed;
      case FilterField.Completed:
        return todo.completed;
      case FilterField.All:
      default:
        return todo;
    }
  });

  if (filter.query) {
    newTodos = newTodos
      .filter(({ title }) => title.toLowerCase()
        .includes(filter.query.toLowerCase()));
  }

  return newTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>({ filterField: FilterField.All, query: '' });
  const [isLoading, setIsLoading] = useState(false);

  const visibleTodos = getFilteredTodos(todos, filter);

  const handleToggleModal = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleFilterChange = (currentFilter: Filter) => {
    setFilter(currentFilter);
  };

  useEffect(() => {
    setIsLoading(true);

    getAllTodos()
      .then((currentTodos: Todo[]) => {
        setTodos(currentTodos);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={handleFilterChange}
                filter={filter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onToggleModal={handleToggleModal}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onToggleModal={handleToggleModal} />
      )}
    </>
  );
};
