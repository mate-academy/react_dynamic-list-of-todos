/* eslint-disable max-len */
import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { useEffect } from 'react';

export const App: React.FC = () => {
  const [loadingUser, setLoadingUser] = React.useState(false);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filterStatus, setFilterStatus] = React.useState<
    'all' | 'active' | 'completed'
  >('all');
  const [filterQuery, setFilterQuery] = React.useState('');
  const [user, setUser] = React.useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        // Handle error silently or add error display logic if needed
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleTodoSelect = (todoId: number) => {
    setLoadingUser(true);

    // Find the specific todo by its ID
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
      setSelectedTodo(todo);

      getUser(todo.userId)
        .then(data => {
          setUser(data);
        })
        .catch(() => {
          // Handle error silently or add error display logic if needed
        })
        .finally(() => {
          setLoadingUser(false);
        });
    } else {
      setLoadingUser(false);
    }
  };

  const handleFilterChange = (
    status: 'all' | 'active' | 'completed',
    query: string,
  ) => {
    setFilterStatus(status);
    setFilterQuery(query);
  };

  // Apply filters to todos
  const filteredTodos = React.useMemo(() => {
    return todos.filter(todo => {
      // Filter by status
      const statusMatch =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'active' && !todo.completed);

      // Filter by title (case-insensitive)
      const titleMatch =
        filterQuery.trim() === '' ||
        todo.title.toLowerCase().includes(filterQuery.toLowerCase().trim());

      return statusMatch && titleMatch;
    });
  }, [todos, filterStatus, filterQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                query={filterQuery}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onTodoSelect={handleTodoSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          user={user}
          loadingUser={loadingUser}
          onClose={() => {
            setSelectedTodo(null);
            setUser(null);
            setLoadingUser(false);
          }}
        />
      )}
    </>
  );
};
