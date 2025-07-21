/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadAllTodos = () => {
    setTodosLoading(true);
    setError(null);

    getTodos()
      .then(setTodos)
      .catch(() => setError('Failed to load todos:'))
      .finally(() => setTodosLoading(false));
  };

  useEffect(() => {
    loadAllTodos();
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      setUserLoading(true);

      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .finally(() => setUserLoading(false));
    } else {
      setSelectedUser(null);
    }
  }, [selectedTodo]);

  // const openTodoModal = (todo: Todo) => {
  //   setSelectedTodo(todo);
  //   setIsModalOpen(true);
  // };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'all') {
        return true;
      }

      if (filter === 'completed') {
        return todo.completed;
      }

      if (filter === 'active') {
        return !todo.completed;
      }

      return false;
    })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onChangeFilter={setFilter}
                query={query}
                onChangeQuery={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {todosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        onClose={() => setSelectedTodo(null)}
        isLoading={userLoading}
      />
    </>
  );
};

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
