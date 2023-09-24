/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/Filter';
import { getTodos } from './api';

function getVisibleTodos(todos: Todo[], query: string, selectedStatus: TodoStatus) {
  let preparedTodos = [...todos];
  const normalizedQuery = query.toLowerCase().trim();

  if (query) {
    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  switch (selectedStatus) {
    case TodoStatus.COMPLETED:
      return preparedTodos.filter(todo => todo.completed);

    case TodoStatus.ACTIVE:
      return preparedTodos.filter(todo => !todo.completed);

    case TodoStatus.ALL:
    default:
      return preparedTodos;
  }
}

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TodoStatus>(TodoStatus.ALL);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(error => {
      // eslint-disable-next-line no-console
        console.warn(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => (
    getVisibleTodos(todos, query, selectedStatus)
  ), [todos, query, selectedStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
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
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
