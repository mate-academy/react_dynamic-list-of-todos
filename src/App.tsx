/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initialTodos, setInitialTodos] = useState<Todo[] | null>([]);
  const [todos, setTodos] = useState<Todo[] | null>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo & { user?: User; } | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos().then(items => {
      setInitialTodos(items);
      setTodos(items);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                initialTodos={initialTodos}
                setTodos={setTodos}
              />
            </div>

            <div className="block">
              {loading && todos?.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  setShowModal={setShowModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && showModal && (
        <TodoModal
          todo={selectedTodo}
          setTodo={setSelectedTodo}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};
