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

type StatusFilter = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'active' && todo.completed) {
      return false;
    }

    if (statusFilter === 'completed' && !todo.completed) {
      return false;
    }

    return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    setLoading(true); // Починаємо завантаження

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => {
        setLoading(false); // Завантаження завершено
      });
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setUserLoading(true);

      getUser(selectedTodo.userId)
        .then(data => setUser(data))
        .catch(() => setUser(null))
        .finally(() => setUserLoading(false));
    } else {
      setUser(null);
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {loading ? <Loader /> : null}

              <TodoList
                todos={filteredTodos}
                selectedTodoId={selectedTodo?.id ?? null}
                onSelect={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo ? (
        <TodoModal
          todo={selectedTodo}
          user={user}
          userLoading={userLoading}
          onClose={() => setSelectedTodo(null)}
        />
      ) : null}
    </>
  );
};
