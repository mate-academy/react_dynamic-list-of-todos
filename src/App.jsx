import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';

import { useSelector } from 'react-redux';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  const [todos, setTodos] = useState([]);

  const filter = useSelector(state => state.todoFilterReducer.filter);
  const title = useSelector(state => state.todoFilterReducer.todoTitle);

  const selectedUser = useSelector(state => state.userReducer.user);

  let todosForFilter = [...todos];

  useEffect(() => {
    const handleTodos = async() => {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    };

    handleTodos();
  }, []);

  switch (filter) {
    case 'ACTIVE':
      todosForFilter = todos.filter(todo => !todo.completed);
      break;

    case 'COMPLETED':
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
          todos={todosForFilter}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUser
            ? <CurrentUser />
            : 'No user selected'
          }
        </div>
      </div>
    </div>
  );
};

export default App;
