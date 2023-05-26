/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { getTodos, getUser } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();

        setTodos(todosData);
        setLoading(false);
      } catch (error) {
        throw new Error('Error fetching todos');
      }
    };

    fetchTodos();
  }, []);

  const handleShowTodo = async (todo: Todo): Promise<void> => {
    setSelectedTodo(todo);

    try {
      const userData = await getUser(todo.userId);

      setUser(userData);
      setUserLoading(false);
    } catch (error) {
      throw new Error('Error fetching user details:');
    }
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setUser(null);
    setUserLoading(true);
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  let filteredTodos;

  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else {
    filteredTodos = todos;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="block">
              {loading ? (
                <Loader /> // Show the loader while fetching todos
              ) : (
                <TodoList todos={filteredTodos} onShowTodo={handleShowTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={handleCloseModal}
          userLoading={userLoading}
        />
      )}

      {userLoading && <Loader />}
      {!userLoading && user && (
        <div>
          <h2>User Details:</h2>
          <p>
            Name:
            {user.name}
          </p>
          <p>
            Email:
            {user.email}
          </p>
        </div>
      )}
    </>
  );
};
