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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();

        setTodos(todosData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch todos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const openModal = async (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingUser(true);

    try {
      const userData = await getUser(todo.userId);

      setUser(userData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch user data. Please try again later.');
    } finally {
      setLoadingUser(false);
    }
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onSelect={openModal}
                  filter={filter}
                  query={query}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={user}
          loadingUser={loadingUser}
          onClose={closeModal}
        />
      )}
    </>
  );
};
