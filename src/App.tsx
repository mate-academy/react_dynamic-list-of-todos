/* eslint-disable max-len */
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
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(TodoStatus.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        return (
          <p style={{ color: 'red' }}>Something went wrong, try again later</p>
        );
      })
      .finally(() => setLoading(false));
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
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
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
