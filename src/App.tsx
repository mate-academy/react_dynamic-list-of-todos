/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterTodos } from './types/FilterTodos';
import { getTodos } from './api';

const getFilteredTodos = (
  todos: Todo[],
  query: string,
  selectedFilter: string,
) => {
  let todosCopy = [...todos];

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    todosCopy = todosCopy.filter(({ title }) => (
      title.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (selectedFilter) {
    todosCopy = todosCopy.filter(({ completed }) => {
      switch (selectedFilter) {
        case FilterTodos.Active:
          return !completed;
        case FilterTodos.Completed:
          return completed;
        default:
          return todosCopy;
      }
    });
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterTodos>(FilterTodos.All);

  useEffect(() => {
    getTodos().then((todosFromSerwer) => {
      setTodos(todosFromSerwer);
    }).finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, query, selectedFilter);
  }, [todos, query, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                selectedFilter={selectedFilter}
                onSelectedFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              )
                : (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    onSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
