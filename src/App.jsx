import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { deleteTodo, getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const loadTodos = () => {
    getTodos()
      .then(setTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const removeTodo = (todoId) => {
    deleteTodo(todoId).then(loadTodos);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectUser={setSelectedUserId}
          deleteTodo={removeTodo}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
