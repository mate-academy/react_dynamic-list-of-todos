import React, { useState } from 'react';
import './App.css';

import getTodos from './api/todosApi';
import getUsers from './api/usersApi';
import TodoList from './Components/todoList';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [todos, setTodos] = useState([]);

  const loadData = async() => {
    setIsStarted(true);

    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    setTodos(todosFromServer.map(todo => (
      {
        ...todo,
        user: usersFromServer.find(person => person.id === todo.userId),
      })));
  };

  const sortBy = async(param1, param2) => {
    if (typeof todos[0][param1] === 'number'
      || typeof todos[0][param1] === 'boolean') {
      const getMethod = (a, b) => a[param1] - b[param1];

      setTodos([...todos].sort(getMethod));
    }

    if (typeof todos[0][param1] === 'object') {
      const getMethod = (a, b) => a[param1][param2]
        .localeCompare(b[param1][param2]);

      setTodos([...todos].sort(getMethod));
    }

    if (typeof todos[0][param1] === 'string') {
      const getMethod = (a, b) => a[param1].localeCompare(b[param1]);

      setTodos([...todos].sort(getMethod));
    }
  };

  return (
    isStarted
      ? (
        <section>
          <h1>Dynamic list of todos</h1>
          <div className="App">
            <table>
              <thead>
                <tr>
                  <th className="click" onClick={() => sortBy('id')}>
                    Id
                  </th>
                  <th className="click" onClick={() => sortBy('title')}>
                    Title
                  </th>
                  <th className="click" onClick={() => sortBy('user', 'name')}>
                    Name
                  </th>
                  <th className="click" onClick={() => sortBy('completed')}>
                    Status
                  </th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                <TodoList
                  todos={todos}
                />
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <>
          <button
            type="button"
            onClick={loadData}
          >
            {isStarted ? 'Loading...' : 'Load todos'}
          </button>
        </>
      )
  );
};

export default App;
