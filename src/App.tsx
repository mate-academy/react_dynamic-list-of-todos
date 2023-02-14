import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [isModalSeen, setIsModalSeen] = useState(false);

  const defaultTodo = {
    title: '',
    id: 0,
    completed: false,
    userId: 0,
  };

  const [todo, setTodo] = useState(defaultTodo);

  useEffect(() => {
    const getTodosFromServer = async () => {
      setIsLoading(true);
      const result = await getTodos();

      setTodos(result);
      setVisibleTodos(result);
      setIsLoading(false);
    };

    getTodosFromServer();
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
                setVisibleTodos={setVisibleTodos}
                visibleTodos={visibleTodos}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {(!!todos.length || !isLoading) && (
                <TodoList
                  todos={visibleTodos}
                  isModalSeen={isModalSeen}
                  todo={todo}
                  setTodo={setTodo}
                  setIsModalSeen={setIsModalSeen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalSeen && (
        <TodoModal
          todo={todo}
          setIsModalSeen={setIsModalSeen}
          isModalLoading={isModalLoading}
          setLoadingModal={setIsModalLoading}
        />
      )}
    </>
  );
};
