/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';
import { TodoModal } from './components/TodoModal';

function getFilteredTodos(
  todos: Todo[],
  status: Status,
  search: string,
): Todo[] {
  return todos
    .filter(
      todo =>
        !search || todo.title.toLowerCase().includes(search.toLowerCase()),
    )
    .filter(
      todo =>
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed),
    );
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState('all' as Status);
  const [search, setSearch] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  useEffect(() => {
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
                search={search}
                onStatusChange={setStatus}
                onSearchChange={setSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={getFilteredTodos(todos, status, search)}
                selectedTodo={selectedTodo}
                onSelect={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(undefined)}
        />
      )}
    </>
  );
};
