import React, { useState } from 'react';
import './App.css';
import TodoItem from './TodoItem'
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
  const loadData = async () => {
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

  const sortTodosById = () => setTodos([...todos]
    .sort((a, b) => a.id - b.id));
  const sortTodosByTitle = () => setTodos([...todos]
    .sort((a, b) => a.title.localeCompare(b.title)));
  const sortTodosByCompleted = () => setTodos([...todos]
    .sort((a, b) => b.completed.toString().localeCompare(
      a.completed.toString())));
  const sortTodosByName = () => setTodos([...todos]
    .sort((a, b) => a.user.name.localeCompare(b.user.name)));

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {todos.length > 0 ? (
        <table>
          <tr>
            <th>
              <button type="button" onClick={sortTodosById}>
                Sort by Id
        </button>
            </th>
            <th>
              <button type="button" onClick={sortTodosByTitle}>
                Sort by Title
        </button>
            </th>
            <th>
              <button type="button" onClick={sortTodosByCompleted}>
                Sort if is completed
        </button>
            </th>
            <th>
              <button type="button" onClick={sortTodosByName}>
                Sort by Name
        </button>
            </th>
          </tr>
          {todos.map(todo => (

            <TodoItem todo={todo} />
          ))}
        </table>
      ) : (
          <button type="button" onClick={loadData}>
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
    </div>
  );
}

export default App;
