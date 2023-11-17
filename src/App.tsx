/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import {
  getTodos,
  // getUser
} from './api';
import { Todo } from './types/Todo';
// import { User } from './types/User';

// function getUserById(userId, usersArray) {
//   return usersArray.find(user => user.id === userId)
//     || null;
// }

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  // const [users, setUsers] = useState<User[] | null[]>([null]);

  useEffect(() => {
    const fetchData = async () => {
      // Отримуємо список todo
      getTodos()
        .then((todosData) => {
          setTodos(todosData);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
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
              {loading ? <Loader /> : <TodoList todos={todos} />}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>

  );
};
