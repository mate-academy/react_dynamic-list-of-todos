/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoStatus, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

type Props = {
  query: string;
  status: TodoStatus;
};

const getFilteredTodos = (todos: Todo[], { query, status }: Props) => {
  let filteredTodos = [...todos];
  const preparedQuery = query.toLowerCase();

  if (preparedQuery) {
    filteredTodos = filteredTodos.filter(todo => {
      const preparedTitle = todo.title.toLowerCase();

      return preparedTitle.includes(preparedQuery);
    });
  }

  if (status !== 'all') {
    filteredTodos = filteredTodos.filter(todo => {
      return status === 'active' ? !todo.completed : todo.completed;
    });
  }

  return filteredTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TodoStatus>('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        // eslint-disable-next-line no-console
        console.info('Something went wrong, try again later');
      })
      .finally(() => setLoading(false));
  }, []);

  const onSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const onCancelSelectedTodo = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = getFilteredTodos(todos, { query, status });

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
              {loading && <Loader />}

              {!loading && (
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
        <TodoModal todo={selectedTodo} onClose={onCancelSelectedTodo} />
      )}
    </>
  );
};
