/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleTodoModal, setVisibleTodalModal] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | undefined>();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(fetchedTodos => {
        setTodos(fetchedTodos);
        setAllTodos(fetchedTodos);
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
              <TodoFilter setTodos={setTodos} initialTodos={allTodos} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={todos}
                  setVisible={setVisibleTodalModal}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {visibleTodoModal && (
        <TodoModal
          activeTodo={activeTodo}
          setVisible={setVisibleTodalModal}
          setActiveTodo={setActiveTodo}
        />
      )}
    </>
  );
};
