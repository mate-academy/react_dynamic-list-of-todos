import React, { useState } from 'react';
import './App.css';
import getData from './getDataApi';
import TodoList from './TodoList';

const todosURL = 'https://jsonplaceholder.typicode.com/todos';
const usersURL = 'https://jsonplaceholder.typicode.com/users';

const getTodosWithUsers = (todosList, usersList) => (
  todosList.map(todo => ({
    ...todo,
    user: usersList.find(person => person.id === todo.userId),
  }))
);

let todos = [];

const App = () => {
  const [isInitialized, setInitialized] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const loadTodosWithUsers = async() => {
    setLoading(true);

    const todosList = await getData(todosURL);
    const usersList = await getData(usersURL);

    todos = [...getTodosWithUsers(todosList, usersList)];

    setLoading(false);
    setInitialized(true);
  };

  return (
    <div className="App">
      {!isInitialized && !isLoading && (
        <button
          type="button"
          className="button--for-loading"
          onClick={loadTodosWithUsers}
        >
          Load
        </button>
      )}

      {isLoading && (
        <p className="loading-text">Loading...</p>)}

      {isInitialized && !isLoading && (
        <TodoList
          fullTodos={[...todos]}
        />
      )}
    </div>
  );
};

export default App;
