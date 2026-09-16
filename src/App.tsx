/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

function getPreparedTodos(
  todos: Todo[],
  selectedStatus: string,
  query: string,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo => {
    let matchesStatus = true;

    if (selectedStatus === 'active') {
      matchesStatus = !todo.completed;
    } else if (selectedStatus === 'completed') {
      matchesStatus = todo.completed;
    }

    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const visibleTodos = getPreparedTodos(todos, selectedStatus, query);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error fetching todos:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTodo) {
      setSelectedUser(null);

      return;
    }

    setLoading(true);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(`Error fetching user ${selectedTodo.userId}:`, error);
      })
      .finally(() => setLoading(false));
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQuery={setQuery}
                selectedStatus={selectedStatus}
                onSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loading={loading}
          selectedTodo={selectedTodo}
          onSelectTodo={setSelectedTodo}
          selectedUser={selectedUser}
        />
      )}
    </>
  );
};
