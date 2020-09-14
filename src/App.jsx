import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { getTodos } from './helpers/api';
import { getVisibleTodos } from './helpers/sortTodos';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const loadData = async() => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer.data);
    } catch (error) {
      setErrorMessage('Loading error');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTodos = getVisibleTodos(todos, status);

  const handleComplete = (todoId) => {
    const completeTodo = filteredTodos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(completeTodo);
  };

  const visibleTodos = filteredTodos.filter(todo => todo.title.includes(title));

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={visibleTodos}
          setTitle={setTitle}
          status={status}
          setStatus={setStatus}
          setSelectedUser={setSelectedUserId}
          handleComplete={handleComplete}
        />
        {errorMessage && <span className="error">{errorMessage}</span>}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              setSelectedUser={setSelectedUserId}
              selectedUserId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
