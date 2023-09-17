/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { PreparedTodo } from './types/PreparedTodos';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectTodo, setSelectTodo] = useState<PreparedTodo | null>(null);

  useEffect(() => {
    getTodos().then(todos => setVisibleTodos(todos));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {visibleTodos.length > 0 ? (
                <TodoList
                  selectTodo={selectTodo}
                  visibleTodos={visibleTodos}
                  setIsModalOpen={setIsModalOpen}
                  setSelectTodo={setSelectTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          setSelectTodo={setSelectTodo}
          selectTodo={selectTodo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
