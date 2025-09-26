import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api/api';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'completed' | 'active'>('all');

  const [isTodosLoading, setIsTodosLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [todosError, setTodosError] = useState<string | null>(null);
  const [userError, setUserError] = useState<string | null>(null);

  // load todos
  useEffect(() => {
    const loadTodos = async () => {
      setIsTodosLoading(true);
      setTodosError(null);
      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
      } catch {
        setTodosError('Não foi possível carregar os todos.');
      } finally {
        setIsTodosLoading(false);
      }
    };

    loadTodos();
  }, []);

  // filtered todos derived at render time
  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (query) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (status !== 'all') {
      result = result.filter(t =>
        status === 'completed' ? t.completed : !t.completed,
      );
    }

    return result;
  }, [todos, query, status]);

  const handleShow = async (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setUserError(null);
    setIsUserLoading(true);

    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch {
      setUserError('Não foi possível carregar os dados do usuário.');
    } finally {
      setIsUserLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setUserError(null);
    setIsUserLoading(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {isTodosLoading && <Loader />}
              {todosError && <p className="has-text-danger">{todosError}</p>}
              {!isTodosLoading && !todosError && (
                <TodoList todos={filteredTodos} onShow={handleShow} />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        todo={selectedTodo}
        user={selectedUser}
        isLoading={isUserLoading}
        error={userError}
        onClose={handleClose}
      />
    </>
  );
};
