import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import * as todosAPI from './api/api';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelcetedUserId] = useState(0);
  const [inputValue, setFilterValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    todosAPI.getTodos().then(res => setTodos(res));
    todosAPI.getTodos().then(res => setFilteredTodos(res));
  }, []);

  const handleUserSelection = (userId) => {
    setSelcetedUserId(userId);
  };

  const handleSelectedUserClearance = () => {
    setSelcetedUserId(0);
  };

  const handleCompletedChange = (todoId) => {
    setTodos(todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return { ...todo };
    }));
  };

  const handleTodosFilter = (event) => {
    const { value } = event.target;

    setFilterValue(value);

    setTodos(filteredTodos.filter(todo => todo.title.toLowerCase()
      .includes(value.toLowerCase())));
  };

  let todosToRender = todos;

  if (selectValue === 'active') {
    todosToRender = todos.filter(todo => todo.completed === false);
  }

  if (selectValue === 'completed') {
    todosToRender = todos.filter(todo => todo.completed === true);
  }

  const handleSelectValueChange = (event) => {
    const { value } = event.target;

    setSelectValue(value);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          userId={selectedUserId}
          onCompletedChange={handleCompletedChange}
          onUserSelection={handleUserSelection}
          todos={todosToRender}
          inputValue={inputValue}
          onTodosFilter={handleTodosFilter}
          selectValue={selectValue}
          onSelectValueChange={handleSelectValueChange}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              onSelectedUserClearance={handleSelectedUserClearance}
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
