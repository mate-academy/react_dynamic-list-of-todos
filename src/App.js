import React from 'react';
import './App.css';

const todosURL = 'https://jsonplaceholder.typicode.com/todos';
const getTodosFromServer = () => {
  return fetch(todosURL)
    .then(response => response.json());
};
const usersURL = 'https://jsonplaceholder.typicode.com/users';
const getUsersFromServer = () => {
  return fetch(usersURL)
    .then(response => response.json());
};

const App = () => {
  state = {
    data: [],
    isLoading: false,
    hasError: false,
  }
  return (
    <div>
      <h1>List of todos</h1>
    </div>
  );
}

export default App;
