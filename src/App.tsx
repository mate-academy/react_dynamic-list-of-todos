import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterBy } from './types/FilterBy';

type FilterTheTodos = (
  todos: Todo[],
  filterBy: FilterBy,
  query: string,
) => Todo[];

const getFilteredTodos: FilterTheTodos = (todos, filterBy, query) => {
  let filteredTodos = [...todos];

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
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [query, setQuery] = useState('');

  const handleToglingTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleQueryResetting = () => setQuery('');
  const handleQuerySelecting = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleFilteringBy = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setFilterBy(event.target.value as FilterBy);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = getFilteredTodos(todos, filterBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onType={handleQuerySelecting}
                onReset={handleQueryResetting}
                query={query}
                onSetFilter={handleFilteringBy}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleToglingTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleToglingTodo} />
      )}
    </>
  );
};
