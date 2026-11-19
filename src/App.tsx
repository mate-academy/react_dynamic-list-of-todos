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
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<TodoStatus>('all');
  const [loading, setLoading] = useState(false);

  const todoToShow = todos.find(todo => todo.id === selectedTodo?.id);
  const onCloseModal = () => setSelectedTodo(undefined);
  const onClearFilter = () => setQuery('');
  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' ? todo.completed : !todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
                onClearFilter={onClearFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSelect={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && todoToShow && (
        <TodoModal todo={todoToShow} onCloseModal={onCloseModal} />
      )}
    </>
  );
};
