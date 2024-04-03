import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterTask } from './types/FilterTask';

type FilterTheTodos = (
  todos: Todo[],
  filterBy: FilterTask,
  query: string,
) => Todo[];

const getFilteredTodos: FilterTheTodos = (todos, filterBy, query) => {
  let filteredTodos = [...todos];

  if (filterBy !== FilterTask.All) {
    filteredTodos = todos.filter(todo => {
      switch (filterBy) {
        case FilterTask.Active:
          return !todo.completed;

        case FilterTask.Completed:
          return todo.completed;

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
  const [filterBy, setFilterBy] = useState<FilterTask>(FilterTask.All);
  const [query, setQuery] = useState('');

  const handleTogglingTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleQueryResetting = () => setQuery('');
  const handleQuerySelecting = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleFilteringBy = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setFilterBy(event.target.value as FilterTask);

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

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleToglingTodo} />
      )}
    </>
  );
};
