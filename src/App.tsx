import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  // 1) Завантажити todos при старті
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsTodosLoading(true);
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch (error) {
      } finally {
        setIsTodosLoading(false);
      }
    };

    loadTodos();
  }, []);

  // знайти вибраний todo по selectedTodoId
  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId) || null;
  }, [todos, selectedTodoId]);

  // 2) Коли вибрали todo -> завантажити user
  useEffect(() => {
    if (!selectedTodo) {
      setUser(null);

      return;
    }

    const loadUser = async () => {
      try {
        setIsUserLoading(true);
        const userFromServer = await getUser(selectedTodo.userId);

        setUser(userFromServer);
      } catch (error) {
        setUser(null);
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUser();
  }, [selectedTodo]);

  // 3) Обробник натиснення Show
  const handleTodoSelect = (todoId: number) => {
    setSelectedTodoId(prevId => (prevId === todoId ? null : todoId));
  };

  const handleCloseModal = () => {
    setSelectedTodoId(null);
  };

  // 4) Видимі todos з урахуванням фільтрів
  const visibleTodos = useMemo(() => {
    let result = [...todos];

    if (status === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (status === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (query.trim()) {
      const normalized = query.trim().toLowerCase();

      result = result.filter(todo =>
        todo.title.toLowerCase().includes(normalized),
      );
    }

    return result;
  }, [todos, status, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {/* Тут підключиш TodoFilter по пропсам з твого компонента */}
            <TodoFilter
              status={status}
              query={query}
              onStatusChange={setStatus}
              onQueryChange={setQuery}
              onQueryClear={() => setQuery('')}
            />

            <div className="block">
              {isTodosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodoId}
                  onTodoSelect={handleTodoSelect}
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
          isUserLoading={isUserLoading}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
