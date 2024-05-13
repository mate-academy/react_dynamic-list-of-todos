import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';

import React, { useEffect, useState } from 'react';

import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';

export enum FilterBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const filterTodos = (todos: Todo[], filterBy: FilterBy) => {
  if (filterBy) {
    switch (filterBy) {
      case FilterBy.All:
        return todos;
      case FilterBy.Active:
        return todos.filter(todo => !todo.completed);
      case FilterBy.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  return todos;
};

const getFilteredTodos = (todos: Todo[], filterBy: FilterBy, query: string) => {
  const filteredTodo = filterTodos(todos, filterBy);

  const trimmedQuery = query.trim().toLowerCase();

  if (trimmedQuery) {
    return filteredTodo.filter(todo =>
      todo.title.toLowerCase().includes(trimmedQuery),
    );
  }

  return filteredTodo;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState(FilterBy.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
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
                onFilter={setFilterBy}
                onQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  onSelected={setSelectedTodo}
                  selectedTodo={selectedTodo}
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
