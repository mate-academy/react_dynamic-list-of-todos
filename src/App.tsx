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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [vsibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      });
  }, []);

  const handleShowModal = (id: number) => {
    setActiveTodo(todos.find(todo => todo.id === id) || todos[0]);
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setActiveTodo(null);
  };

  const handleFilter = (visibleTodos: Todo[]) => {
    setVisibleTodos(visibleTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={handleFilter} todos={todos} />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={vsibleTodos}
                  showModal={handleShowModal}
                  activeTodo={activeTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalActive
        && activeTodo
        && (
          <TodoModal
            todo={activeTodo}
            closeModal={handleCloseModal}
          />
        )}
    </>
  );
};
