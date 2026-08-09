/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLocaleLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(prev => (prev?.id === todo.id ? null : todo));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                query={query}
                setStatus={setStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
    </>
  );
};
