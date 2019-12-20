import React, { useState } from 'react';
import './App.css';

import getTodos from './api/todosApi';
import getUsers from './api/usersApi';
import TodoList from './Components/todoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);

  getUsers().then(setUsers);
  getTodos().then(setTodos);

  const todosWithUsers = todos.map(todo => (
    {
      ...todo,
      user: users.find(person => person.id === todo.userId),
    }));

  return (
    <section>
      <h1>Dynamic list of todos</h1>
      <div className="App">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <TodoList todos={todosWithUsers} />
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default App;
