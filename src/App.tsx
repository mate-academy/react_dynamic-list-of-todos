/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [user, setUser] = useState({} as User);
  const [userId, setUserId] = useState(0);
  const [todo, setTodo] = useState({} as Todo);

  const reset = () => {
    setUser({} as User);
    setTodo({} as Todo);
    setUserId(0);
  };

  const getTodosFromServer = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
    setVisibleTodos(todosFromServer);
  };

  const getUserFromServer = async (id: number) => {
    const userFromServer = await getUser(id);

    setUser(userFromServer);
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  useEffect(() => {
    getUserFromServer(userId);
  }, [userId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setTodos={setVisibleTodos}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={todo}
                    setTodo={(newTodo: Todo) => setTodo(newTodo)}
                    setUserId={(id: number) => setUserId(id)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todo.userId && (
        <TodoModal
          user={user}
          todo={todo}
          reset={reset}
        />
      )}
    </>
  );
};
