/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

// Выносим функцию фильтрации за пределы компонента.
// Теперь она не пересоздается при каждом рендере и не ломает useMemo.
const applyFilters = (list: Todo[], statusFilter: string, query: string) => {
  let result = [...list];

  if (statusFilter === 'active') {
    result = result.filter(t => !t.completed);
  } else if (statusFilter === 'completed') {
    result = result.filter(t => t.completed);
  }

  const q = query.trim().toLowerCase();

  if (q) {
    result = result.filter(t => t.title.toLowerCase().includes(q));
  }

  return result;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoadingTodos(true);
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setLoadingTodos(false);
      }
    };

    load();
  }, []);

  // Теперь зависимости чистые, мемоизация работает корректно
  const visibleTodos = useMemo(
    () => applyFilters(todos, statusFilter, query),
    [todos, statusFilter, query],
  );

  const handleStatusChange = (value: 'all' | 'active' | 'completed') => {
    setStatusFilter(value);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  // Чистый и прямолинейный асинхронный обработчик без ложных "cleanup-функций"
  const handleShow = async (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    setSelectedTodo(todo);
    setSelectedUser(null);
    setModalVisible(true);
    setModalLoading(true);

    try {
      const user = await getUser(todo.userId);

      setSelectedUser(user);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
    setSelectedUser(null);
    setModalLoading(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                status={statusFilter}
                query={query}
                onStatusChange={handleStatusChange}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>
            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo}
                  onSelect={handleShow}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal
        visible={modalVisible}
        loading={modalLoading}
        todo={selectedTodo}
        user={selectedUser}
        onClose={handleCloseModal}
      />
    </>
  );
};