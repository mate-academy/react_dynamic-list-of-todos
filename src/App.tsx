import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visibleTodos = todos.filter(todo => {
    const normalizedTitle = todo.title.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    const matchesQuery = normalizedTitle.includes(normalizedQuery);

    switch (status) {
      case 'active':
        return matchesQuery && !todo.completed;

      case 'completed':
        return matchesQuery && todo.completed;

      default:
        return matchesQuery;
    }
  });

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  const handleStatusChange = (value: string) => {
    if (value === 'all' || value === 'active' || value === 'completed') {
      setStatus(value);
    }
  };

  const handleSelectTodo = (todoId: number) => {
    setSelectedTodoId(currentId => (currentId === todoId ? 0 : todoId));
  };

  const handleCloseModal = () => {
    setSelectedTodoId(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={handleStatusChange}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onSelect={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
