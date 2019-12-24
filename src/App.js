import React, { useState } from 'react';
import './App.css';
import TodoItem from './TodoItem'
const API_URL = 'https://jsonplaceholder.typicode.com';
const delay = () => new Promise((resolve) => {
  setTimeout(resolve, 500);
});

const getTodos = () => {
  return delay()
    .then(() => fetch(`${API_URL}/todos`))
    .then(response => response.ok ? response.json() : [])
    .catch(() => []);
};

const getUsers = () => {
  return delay()
    .then(() => fetch(`${API_URL}/users`))
    .then(response => {
      return response.ok ? response.json() : []
    })
    .catch(() => []);
};

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setLoaing] = useState(false);
  const [sortType, setSort] = useState('');
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

  const sortTableBy = (title) => {
    if (sortType === title) {
      setTodos([...todos].reverse());
    } else {
      switch (title) {
        case 'id':
          setTodos([...todos]
            .sort((a, b) => a.id - b.id));
          break;
        case 'title':
          setTodos([...todos]
            .sort((a, b) => a.title.localeCompare(b.title)));
          break;
        case 'user':
          setTodos([...todos]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)));
          break;
        case 'completed':
          setTodos([...todos]
            .sort((a, b) => b.completed.toString().localeCompare(
              a.completed.toString())));
          break;
        default:
      }
      setSort(title);
    }
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {todos.length > 0 ? (
        <table>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => sortTableBy('id')} >
              Sort by Id
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortTableBy('title')}>
              Sort by Title
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortTableBy('completed')}>
              Sort if is completed
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortTableBy('user')}>
              Sort by Name
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
