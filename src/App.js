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

  const sortedDataByTitle = async() => {
    setIsStarted(true);

    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    setTodos([...todosFromServer.map(todo => (
      {
        ...todo,
        user: usersFromServer.find(person => person.id === todo.userId),
      }))].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortedDataByName = async() => {
    setIsStarted(true);

    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    setTodos([...todosFromServer.map(todo => (
      {
        ...todo,
        user: usersFromServer.find(person => person.id === todo.userId),
      }))].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  const sortedDataByStatus = async() => {
    setIsStarted(true);

    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    setTodos([...todosFromServer.map(todo => (
      {
        ...todo,
        user: usersFromServer.find(person => person.id === todo.userId),
      }))].sort((a, b) => a.completed - b.completed));
  };

  const sortedDataById = async() => {
    setIsStarted(true);

    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    setTodos([...todosFromServer.map(todo => (
      {
        ...todo,
        user: usersFromServer.find(person => person.id === todo.userId),
      }))].sort((a, b) => a.id - b.id));
  };

  return (
    isStarted
      ? (
        <section>
          <h1>Dynamic list of todos</h1>
          <button
            type="button"
            onClick={sortedDataByTitle}
          >
              Sort by title
          </button>

          <button
            type="button"
            onClick={sortedDataByName}
          >
              Sort by name
          </button>

          <button
            type="button"
            onClick={sortedDataByStatus}
          >
            Sort by status
          </button>

          <button
            type="button"
            onClick={sortedDataById}
          >
            Sort by Id
          </button>

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
