/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [active, setActive] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setInitialTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOpenModal = (userId: number, todo: Todo) => {
    setSelectedUserId(userId);
    setSelectedTodo(todo);
    setActive(true);
  };

  const handleCloseModal = () => {
    setActive(false);
    setSelectedTodo(null);
    setSelectedUserId(null);
  };

  const handleSetTodos = useCallback((todoes: Todo[]) => {
    setTodos(todoes);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setTodos={handleSetTodos}
                initialTodos={initialTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={todos}
                handleOpenModal={handleOpenModal}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        active={active}
        selectedUserId={selectedUserId}
        onClose={handleCloseModal}
        selectedTodo={selectedTodo}
      />
    </>
  );
};
