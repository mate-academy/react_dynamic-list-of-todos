import React, { useState } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './helpers/api';
import { TodoList } from './components/TodoList/TodoList';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoadClick = async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();
      const usersFromServer = await getUsers();

      const todosWithUsers = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
    } catch (exeption) {
      setErrorMessage('Network error, try again.');
    }

    setIsLoading(false);
  }

  return (
    <div className="todo">
      <h1>List of Todos</h1>

      {todos.length === 0 ? (
        <>
          <button
            type="button"
            className="todo__button"
            onClick={handleLoadClick}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>

          {errorMessage && <span className="todo__error">{errorMessage}</span>}
        </>
      ) : (
        <TodoList todoList={todos} />
      )}
    </div>
  )
}

export default App;
