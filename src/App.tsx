/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Status, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

interface Filters {
  query: string;
  status: Status;
}

const getFilteredTodos = (todos: Todo[], { query, status }: Filters) => {
  let filteredTodos = [...todos];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedTodoTitle = todo.title.trim().toLowerCase();

      return normalizedTodoTitle.includes(normalizedQuery);
    });
  }

  if (status !== 'all') {
    filteredTodos = filteredTodos.filter(todo => {
      return status === 'completed' ? todo.completed : !todo.completed;
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  const filteredTodos = getFilteredTodos(todos, { query, status });

  const onSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onUnselectTodo = () => setSelectedTodo(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => alert(`could not load the todos`))
      .finally(() => setIsLoadingTodos(false));
  }, []);

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
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}

              {!isLoadingTodos && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectTodo={onSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={onUnselectTodo} />
      )}
    </>
  );
};
