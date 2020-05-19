import React, { useState } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './helpers/api';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleLoadClick = async () => {
    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
  }

  return (
    <div>
      <h1>List</h1>

      <button type="button" onClick={handleLoadClick}>
        Load
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} disabled />
            {todo.title + ' '} 
            ({todo.user? todo.user.name : 'Unknown'})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
