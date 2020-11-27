import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api/api';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    const fetchTodos = async() => {
      const result = await getTodos();

      setTodos(result);
    };

    fetchTodos();
  }, [selectedUserId]);

  const chooseUserId = (userId) => {
    setSelectedUserId(userId);
  };

  const randomize = () => {
    setTodos([...todos].sort(() => 0.5 - Math.random()));
  };

  const checkOnCompletedTodos = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          chooseUserId={chooseUserId}
          randomize={randomize}
          checkOnCompletedTodos={checkOnCompletedTodos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              chooseUserId={chooseUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
