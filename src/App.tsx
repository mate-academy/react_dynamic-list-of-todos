/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [toDos, setToDos] = React.useState<Todo[]>([]);
  const [showLoader, setShowLoader] = React.useState(true);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState('all');

  const closeModal = () => setSelectedTodo(null);

  useEffect(() => {
    getTodos()
      .then(data => setToDos(data))
      .finally(() => setShowLoader(false));
  }, []);

  const visibleTodos = toDos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesQuery && matchesStatus;
  });

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
              {showLoader ? (
                <Loader />
              ) : (
                <TodoList
                  toDos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
