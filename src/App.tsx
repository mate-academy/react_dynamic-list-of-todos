/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  // const [loaderState, setLoaderState] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isLoader, setIsLoader] = useState(false);
  // const [user, setUser] = useState(null);

  const BASE_URL = 'https://mate-academy.github.io'
  + '/react_dynamic-list-of-todos/api';

  const request = (url: any) => {
    return fetch(`${BASE_URL}${url}`)
      .then(response => {
        return response.json();
      })
      .then(result => result);
  };

  const getTodos = () => request('/todos.json');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setAllTodos(todos);
      });
  }, []);

  const handleclick = (id: any) => {
    setUserId(id);
    setIsLoader(true);
  };

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
              {isLoader && (
                <Loader />
              )}

              <TodoList
                todos={allTodos}
                selectTodo={handleclick}
                // handleClick={handleClick}
                // getTodos={getTodos}
              />
            </div>
          </div>
        </div>
      </div>
      {userId && (
        <TodoModal isLoader={isLoader} />
      )}

    </>
  );
};

// const getTodos = (id) => request(`/todos.json/${id}`);
// const getUsers = () => request('/users/1.json');
// function componentDidMount() {
//   throw new Error('Function not implemented.');
// }
// getUsers()
//   .then(user => {
//     console.log(user);
//   });

// const handleClick = () => {
//   getTodos()
//     .then(todos => {
//       return todos;
//     });
// };

// getUsers()
//   .then(user => {
//     console.log(user);
//   });

// const handleClick = () => {
//   getUsers()
//     .then(todos => {
//       return todos;
//     });
// };

// if(!user) {

// }
