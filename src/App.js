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
  const [isError, setError] = useState(false);

  const loadTodosWithUsers = async() => {
    try {
      setError(false);
      setLoading(true);

      const todosList = await getData(todosURL);
      const usersList = await getData(usersURL);

      todos = [...getTodosWithUsers(todosList, usersList)];

      setInitialized(true);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      {!isInitialized && !isLoading && !isError && (
        <button
          type="button"
          className="load load--start"
          onClick={loadTodosWithUsers}
        >
          Load
        </button>
      )}

      {isLoading && !isError && (<p className="loading-text">Loading...</p>)}

      {isError && (
        <button
          type="button"
          className="load load--start"
          onClick={loadTodosWithUsers}
        >
          Try again
        </button>
      )}

      {isInitialized && !isLoading && (
        <TodoList
          fullTodos={[...todos]}
        />
      )}
    </div>
  );
};

export default App;
