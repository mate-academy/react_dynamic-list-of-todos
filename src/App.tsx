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

const isQueryIncludes = (a: string, b: string) => {
  return a.toLowerCase().trim().includes(b.toLowerCase().trim());
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);

  const filteredTodos = todos
    .filter(tod => {
      if (filter === 'completed') {
        return tod.completed;
      }

      if (filter === 'active') {
        return !tod.completed;
      }

      return true;
    })
    .filter(tod => isQueryIncludes(tod.title, searchQuery));

  useEffect(() => {
    setMainLoader(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
      })
      .finally(() => {
        setMainLoader(false);
      });
  }, []);

  const onEyeClick = (userId: number, selectedTodo: Todo) => {
    setLoading(true);
    getUser(userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
        setTodo(selectedTodo);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeModal = () => {
    setUser(null);
    setTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={setFilter}
                onSearchChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {mainLoader && <Loader />}
              <TodoList
                todos={filteredTodos}
                onEyeClick={onEyeClick}
                activeTodoId={todo?.id}
              />
            </div>
          </div>
        </div>
      </div>

      {((user && todo) || loading) && (
        <TodoModal
          onClose={closeModal}
          todo={todo}
          user={user}
          loading={loading}
        />
      )}
    </>
  );
};
