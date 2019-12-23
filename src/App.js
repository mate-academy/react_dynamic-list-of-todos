import React, { useState } from 'react';
import './App.css';
const API_URL = 'https://jsonplaceholder.typicode.com';
const delay = () => new Promise((resolve) => {
  setTimeout(resolve, 500);
});
const getTodos = () => {
  console.log('Loading todos');
  return delay()
    .then(() => fetch(`${API_URL}/todos`))
    .then(response => response.ok ? response.json() : [])
    .catch(() => []);
};
const getUsers = () => {
  console.log('Loading users');
  return delay()
    .then(() => fetch(`${API_URL}/users`))
    .then(response => {
      console.log('Users are loaded');
      return response.ok ? response.json() : []
    })
    .catch(() => []);
};
function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoaing] = useState(false);
  const loadData = async() => {
    setLoaing(true);
    const [
      todosFromServer,
      usersFromServer
    ] = await Promise.all([
      getTodos(),
      getUsers()
    ]);
    setTodos(todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => todo.userId === user.id)
    })));
  };
  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {todos.length > 0 ? (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.completed ? '✅' : '❌'}
              {todo.user.name}
              {' - '}
              {todo.title}
            </li>
          ))}
        </ul>
      ) : (
        <button type="button" onClick={loadData}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </div>
  );
}
export default App;
