import { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import type { Todo } from './types/Todo';
import type { TodoStatus } from './types/TodoStatus';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TodoStatus>('all');

  useEffect(() => {
    let isMounted = true;

    getTodos()
      .then(loadedTodos => {
        if (isMounted) {
          setTodos(loadedTodos);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      return matchesQuery && matchesStatus;
    });
  }, [query, status, todos]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(currentTodo => {
      if (currentTodo?.id === todo.id) {
        return null;
      }

      return todo;
    });
  };

  const handleQueryClear = () => {
    setQuery('');
  };

  const handleModalClose = () => {
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
                query={query}
                status={status}
                onQueryChange={setQuery}
                onStatusChange={setStatus}
                onQueryClear={handleQueryClear}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onTodoSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleModalClose} />
      )}
    </>
  );
};
