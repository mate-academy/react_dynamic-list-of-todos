/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';

type Status = 'all' | 'completed' | 'active';

export const App: React.FC = () => {
  // данные
  const [todos, setTodos] = useState<Todo[]>([]);

  // загрузки/ошибки
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // фильтры
  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  // модалка
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 1) грузим список задач один раз
  useEffect(() => {
    const load = async () => {
      setLoadingTodos(true);
      setError(null);

      try {
        const data = await getTodos();

        setTodos(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load todos');
      } finally {
        setLoadingTodos(false);
      }
    };

    load();
  }, []);

  const filtered = useMemo(() => {
    let list = todos;

    if (status === 'completed') {
      list = list.filter(t => t.completed);
    } else if (status === 'active') {
      list = list.filter(t => !t.completed);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();

      list = list.filter(t => t.title.toLowerCase().includes(q));
    }

    return list;
  }, [todos, status, query]);

  // 3) обработчик «Show»: открыть модалку и подгрузить пользователя
  const handleShow = useCallback(async (todo: Todo) => {
    setSelectedTodo(todo);
    setSelectedUser(null);
    setLoadingUser(true);
    setError(null);

    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load user');
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setSelectedUser(null);
    setLoadingUser(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            {error && (
              <p className="has-text-danger" data-cy="error">
                {error}
              </p>
            )}

            <div
              className="block"
              style={{ position: 'relative', minHeight: 80 }}
            >
              {loadingTodos && <Loader />}
              <TodoList
                todos={filtered}
                selectedId={selectedTodo?.id}
                onShow={handleShow}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={!!selectedTodo}
        todo={selectedTodo}
        user={selectedUser}
        loading={loadingUser}
        onClose={handleCloseModal}
      />
    </>
  );
};
