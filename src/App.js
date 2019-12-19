import React, { useState } from 'react';
import './App.css';
import ToDoList from './ToDoList';

const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const loadDataFromServer = async(url) => {
  const response = await fetch(url);

  return response.json();
};

function getTodosWithUsers(todosArr, usersArr) {
  return todosArr.map(todo => (
    {
      ...todo,
      user: { ...usersArr.find(user => user.id === todo.userId) },
    }
  ));
}

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [todosWithUsers, setTodosWithUsers] = useState([]);
  const [currentSortedColumn, setCurrentSortedColumn] = useState('');

  const loadData = async() => {
    setLoading(true);

    const todos = await loadDataFromServer(urlTodos);
    const users = await loadDataFromServer(urlUsers);

    setLoading(false);
    setLoaded(true);
    setTodosWithUsers(getTodosWithUsers(todos, users));
  };

  const sortColumn = (type, field) => {
    const todos = [...todosWithUsers];

    if (currentSortedColumn === field) {
      setTodosWithUsers(todos.reverse());

      return;
    }

    switch (type) {
      case 'string':
        field === 'title'
          ? todos.sort((a, b) => a[field].localeCompare(b[field]))
          : todos.sort((a, b) => a.user[field].localeCompare(b.user[field]));
        break;
      case 'bool':
        todos.sort((a, b) => (
          a[field].toString().localeCompare(b[field].toString())
        ));
        break;
      default:
        todos.sort();
    }

    setTodosWithUsers(todos);
    setCurrentSortedColumn(field);
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {isLoading ? <h2>Loading...</h2> : ''}
      {isLoaded
        ? (
          <ToDoList todos={todosWithUsers} sort={sortColumn} />
        )
        : (
          <button type="button" onClick={loadData}>Load data</button>
        )
      }

    </div>
  );
}

export default App;
