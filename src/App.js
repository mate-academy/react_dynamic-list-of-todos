import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { getTodos } from './api/todosApi';
import { getUsers } from './api/usersApi';

const App = () => {
  const [todos, saveTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isSortedBy, setSortedBy] = useState('');

  const loadTodos = async() => {
    setLoading(true);

    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    const preparedTodos = todosFromServer.map((todo) => {
      const user = usersFromServer.find(item => item.id === todo.userId);

      return {
        ...todo, user,
      };
    });

    saveTodos(preparedTodos);
    setLoaded(true);
    setLoading(false);
  };

  const sortTodos = (sortBy) => {
    if (sortBy === isSortedBy) {
      saveTodos([...todos].reverse());
    } else {
      switch (sortBy) {
        case 'title':
          saveTodos([...todos]
            .sort((a, b) => a.title.localeCompare(b.title)));
          break;
        case 'user':
          saveTodos([...todos]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)));
          break;
        case 'status':
          saveTodos([...todos]
            .sort((a, b) => b.completed.toString().localeCompare(
              a.completed.toString()
            )));
          break;
        default:
          saveTodos([...todos]
            .sort((a, b) => a.id - b.id));
      }
      setSortedBy(sortBy);
    }
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {!isLoaded && !isLoading
        ? (
          <button
            type="button"
            onClick={loadTodos}
          >
            Load list of Todos
          </button>
        )
        : ''
      }
      {isLoading ? (<h3>Loading... Please wait...</h3>) : ''}
      {isLoaded ? <TodoList todos={todos} sortTodos={sortTodos} /> : ''}
    </div>
  );
};

export default App;
