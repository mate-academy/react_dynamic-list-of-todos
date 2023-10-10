/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader';

const getFilterTodos = (
  todos: Todo[],
  statusFilter: string,
  queryFilter: string,
): Todo[] => {
  let filteredTodos: Todo[] = [];

  switch (statusFilter) {
    case 'all': {
      filteredTodos = todos;
      break;
    }

    case 'active': {
      filteredTodos = todos.filter(todo => todo.completed === false);

      break;
    }

    case 'completed': {
      filteredTodos = todos.filter(todo => todo.completed === true);

      break;
    }

    default: filteredTodos = todos;
  }

  if (!queryFilter) {
    return filteredTodos;
  }

  const queryLower = queryFilter.trim().toLowerCase();
  const preparedTodos = filteredTodos.filter(({ title }) => {
    const titleLower = title.toLowerCase();

    return titleLower.includes(queryLower);
  });

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(todoFromServer => {
        setTodos(todoFromServer);
      })
      .catch(() => {
        throw new Error('Can not loading todos');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = getFilterTodos(todos, status, query);

  const handleStatusChange = (currentStatus: string) => {
    setStatus(currentStatus);
  };

  const handleQueryChange = (currentQuery: string) => {
    setQuery(currentQuery);
  };

  const resetQuery = () => {
    setQuery('');
  };

  const onSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                handleStatusChange={handleStatusChange}
                handleQueryChange={handleQueryChange}
                resetQuery={resetQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    onSelectedTodo={onSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
