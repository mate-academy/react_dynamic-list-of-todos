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
  const [isShowModal, setisShowModal] = useState(false);
  const [vsibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      });
  }, []);

  const showModal = (id: number) => {
    setActiveTodo(todos.find(todo => todo.id === id) || todos[0]);
    setisShowModal(true);
  };

  const closeModal = () => {
    setisShowModal(false);
    setActiveTodo(null);
  };

  const todosFilter = (visibleTodos: Todo[]) => {
    setVisibleTodos(visibleTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={todosFilter} todos={todos} />
            </div>

            <div className="block">
              {todos.length > 0 ? (
                <TodoList
                  todos={vsibleTodos}
                  showModal={showModal}
                  activeTodo={activeTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {isShowModal
        && activeTodo
        && (
          <TodoModal
            todo={activeTodo}
            closeModal={closeModal}
          />
        )}
    </>
  );
};
