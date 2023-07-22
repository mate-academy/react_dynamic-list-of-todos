/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setVisibleTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                onChange={setVisibleTodos}
                visibleTodos={visibleTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                visibleTodos={visibleTodos}
                handleUserId={setUserId}
                handleTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        userId={userId}
        handleUserId={setUserId}
        todo={selectedTodo}
        handleTodo={setSelectedTodo}
      />
    </>
  );
};
