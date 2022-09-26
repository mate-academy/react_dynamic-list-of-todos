/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [activeUserId, setActiveUserId] = useState(0);
  const [activeTodo, setActiveTodo] = useState<Todo>();

  const openModal = (userId: number, todoId: number) => {
    setIsModalOpened(true);
    setActiveUserId(userId);

    const selectedTodo = todos.find(todo => todo.id === todoId);

    setActiveTodo(selectedTodo);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(response => {
      setTodos(response);
      setVisibleTodos(response);
      setIsLoading(false);
      setIsLoaded(true);
    });
  }, []);

  const onSelect = (value: string) => {
    switch (value) {
      case 'active':
        setVisibleTodos(todos
          .filter(todo => todo.completed === false));
        break;

      case 'completed':
        setVisibleTodos(todos
          .filter(todo => todo.completed === true));
        break;

      case 'all':
        setVisibleTodos(todos);
        break;

      default: break;
    }
  };

  const onInput = (value: string) => {
    const newTodos = todos.filter(todo => {
      return todo.title.toLowerCase().includes(value.toLowerCase());
    });

    setVisibleTodos(newTodos);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelect={onSelect}
                handleInpput={onInput}
              />
            </div>

            <div className="block">
              {isLoading
                && <Loader />}

              {isLoaded
                && <TodoList todos={visibleTodos} handleClick={openModal} />}
            </div>
          </div>
        </div>
      </div>

      {isModalOpened && activeTodo
        && <TodoModal handleClose={closeModal} userId={activeUserId} todo={activeTodo} />}
    </>
  );
};
