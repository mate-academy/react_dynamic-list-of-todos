import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodosFilter } from './types/TodosFilter';

const getFilteredTodos = (
  todos: Todo[],
  query: string,
  selectedFilter: string,
) => {
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todos.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (selectedFilter) {
    switch (selectedFilter) {
      case TodosFilter.active:
        return todosCopy.filter(({ completed }) => !completed);
      case TodosFilter.completed:
        return todosCopy.filter(({ completed }) => completed);
      default:
        return todosCopy;
    }
  }

  return todosCopy;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<TodosFilter>(
    TodosFilter.all,
  );
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todosFrommServer) => {
        setTodos(todosFrommServer);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      })
      .finally(() => setIsLoading(false));
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
                onSelectFilter={setSelectedFilter}
              />
            </div>

            <div className="block">
              {!isLoading ? (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={setSelectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelectTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
