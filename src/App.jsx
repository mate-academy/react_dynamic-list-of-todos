import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedUserId, setUserId] = useState(0);
  const [selectedFilter, setFilter] = useState('All');

  let todosForFilter = [...todos];

  const handlerFilterStatus = (newStatus) => {
    setFilter(newStatus);
  };

  const handleInputChange = (text) => {
    setTitle(text);
  };

  const selectUser = (userId) => {
    setUserId(userId);
  };

  const clearData = () => {
    setUserId(null);
  };

  useEffect(() => {
    const handleTodos = async() => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    };

    handleTodos();
  }, []);

  switch (selectedFilter) {
    case 'Active':
      todosForFilter = todos.filter(todo => !todo.completed);
      break;

    case 'Completed':
      todosForFilter = todos.filter(todo => todo.completed);
      break;

    default:
      todosForFilter = todos;
      break;
  }

  if (title.length > 0) {
    todosForFilter = todosForFilter.filter((todo) => {
      if (todo.title) {
        return todo.title.includes(title);
      }

      return false;
    });
  }

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          handlerFilterStatus={handlerFilterStatus}
          handleInputChange={handleInputChange}
          selectUser={selectUser}
          todos={todosForFilter}
          selectedFilter={selectedFilter}
          title={title}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId
            ? (
              <CurrentUser
                userId={selectedUserId}
                clearData={clearData}
              />
            )
            : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
