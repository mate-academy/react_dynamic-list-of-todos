import React, { useState, useEffect } from 'react';
import { getTodos } from './api/api';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [text, addText] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    getTodos()
      .then((list) => {
        const listFromServer
          = list.data.filter(item => item.title && item.id && item.userId);

        setTodos(listFromServer);
        setFilteredTodos(listFromServer);
      });
  }, []);

  const selectUser = (event) => {
    setSelectedUserId(event.target.textContent);
  };

  const userClear = () => {
    setSelectedUserId('');
  };

  const filterByTitle = (value) => {
    let result = [];

    addText(value);
    result = selectStatus(status, todos, value);
    setFilteredTodos(result);
  };

  const selectStatus = (currentStatus, arrayTodos = todos, query = text) => {
    setStatus(currentStatus);
    let result = [];

    switch (currentStatus) {
      case 'Active':
        result = arrayTodos.filter(todo => !todo.completed);

        if (query) {
          result = result.filter(todo => todo.title.includes(query));
        }

        setFilteredTodos(result);

        return result;
      case 'Completed':
        result = arrayTodos.filter(todo => todo.completed);

        if (query) {
          result = result.filter(todo => todo.title.includes(query));
        }

        setFilteredTodos(result);

        return result;
      default:
        if (query) {
          result = arrayTodos.filter(todo => todo.title.includes(query));
          setFilteredTodos(result);

          return result;
        }

        setFilteredTodos(todos);

        return todos;
    }
  };

  const changeStatus = (id) => {
    setFilteredTodos(filteredTodos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }

      return todo;
    }));
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          text={text}
          status={status}
          currentTodos={filteredTodos}
          selectUser={selectUser}
          selectStatus={selectStatus}
          filterByTitle={filterByTitle}
          changeStatus={changeStatus}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId.match(/\d$/)[0]}
              userClear={userClear}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
