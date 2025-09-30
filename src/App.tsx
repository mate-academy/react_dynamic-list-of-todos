/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { getTodos, getUser } from './api';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(false);

  const [statusFilter, setStatusFilter] = useState<
  'all' | 'active' | 'completed'
  >('all');
  const [query, setQuery] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Load todos on mount
  useEffect(() => {
    const loadTodos = async () => {
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

    loadTodos();
  }, []);

  // Fetch user when selectedTodo changes
  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    let isMounted = true;

    setModalLoading(true);
    setSelectedUser(null);

    const fetchUser = async () => {
      try {
        const user = await getUser(selectedTodo.userId);

        if (isMounted) {
          setSelectedUser(user);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        if (isMounted) {
          setModalLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [selectedTodo]);

  const applyFilters = (list: Todo[]) => {
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

  const visibleTodos = useMemo(
    () => applyFilters(todos),
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

  const handleShow = (id: number) => {
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      return;
    }

    setSelectedTodo(todo);
    setModalVisible(true);
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
