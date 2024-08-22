import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';
import { getTodos } from './api';

type Props = {
  query: string;
  status: TodoStatus;
};

const filteredTodos = (todos: Todo[], { query, status }: Props) => {
  let filterTodos = todos;

  if (query.trim()) {
    filterTodos = filterTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  if (status !== TodoStatus.all) {
    filterTodos = filterTodos.filter(todo =>
      status === TodoStatus.completed ? todo.completed : !todo.completed,
    );
  }

  return filterTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(TodoStatus.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Failed to load todos. Please try again later.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filterTodos = filteredTodos(todos, { query, status });

  const handleSelect = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleClose = () => {
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
                setQuery={setQuery}
                status={status}
                setStatus={setStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {error && <p className="has-text-danger">{error}</p>}
              {!isLoading && !error && todos.length > 0 && (
                <TodoList
                  todos={filterTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onCloseModal={handleClose} />
      )}
    </>
  );
};
