/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
// import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';

// import { Todo } from './types/Todo';
// import { User } from './types/User';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: any;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    getTodos().then(allTodos => {
      const todoPromises = allTodos.map(todo => {
        return getUser(todo.userId)
          .then(user => {
            const updatedTodo: Todo = { ...todo, user };

            return updatedTodo;
          });
      });

      Promise.all(todoPromises)
        .then(todoWithUser => {
          setTodos(todoWithUser);
        });
    });
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
              {/* <Loader /> */}
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
