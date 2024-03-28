/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

enum FilterBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type FilterTheTodos = (
  todos: Todo[],
  filterBy: string,
  query: string,
) => Todo[];

const getFilteredTodos: FilterTheTodos = (todos, filterBy, query) => {
  let filteredTodos = todos;

  // eslint-disable-next-line no-console
  console.log(filterBy, query);

  if (filterBy !== FilterBy.All) {
    filteredTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Active:
          return todo.completed === false;

        case FilterBy.Completed:
          return todo.completed === true;

        default:
          throw new Error('Unknown filter type');
      }
    });
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<string>(FilterBy.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(newTodos => {
        setTodos(newTodos);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const filterTodos = getFilteredTodos(todos, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilterBy={setFilterBy}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos}
                  selectedTodo={selectedTodo}
                  handleShowButtonClick={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={setSelectedTodo}
        />
      )}
    </>
  );
};
