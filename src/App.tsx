/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/indent
  const [filterS, setFilterS] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
        setFilteredTodos(fetchedTodos);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowTodo = async (todo: Todo) => {
    setLoading(true);
    try {
      const user = await getUser(todo.userId);

      setSelectedTodo(todo);
      setUserDetails(user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setUserDetails(null);
  };

  const handleFilterChange = (
    query: string,
    status: 'all' | 'completed' | 'active',
  ) => {
    setFilterQuery(query);
    setFilterS(status);

    const filtered = todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      return matchesQuery && matchesStatus;
    });

    setFilteredTodos(filtered);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={filterQuery}
                status={filterS}
                onFilterChange={handleFilterChange}
                onClearQuery={() => handleFilterChange('', 'all')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList todos={filteredTodos} onShow={handleShowTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          user={userDetails}
          isLoading={loading}
          onClose={closeModal}
        />
      )}
    </>
  );
};
