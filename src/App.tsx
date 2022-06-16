import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const changeUser = (userId: number) => setSelectedUserId(userId);

  const getCurrentTodos = () => {
    getTodos()
      .then((currentTodosFromServer) => {
        setTodos(currentTodosFromServer);
      });
  };

  useEffect(() => {
    getCurrentTodos();
  }, []);

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'all') {
      getCurrentTodos();
    }

    if (event.target.value === 'complited') {
      getTodos()
        .then((currentTodosFromServer) => {
          setTodos(
            currentTodosFromServer
              .filter((todo: Todo) => todo.completed),
          );
        });
    }

    if (event.target.value === 'uncomplited') {
      getTodos()
        .then((currentTodosFromServer) => {
          setTodos(
            currentTodosFromServer
              .filter((todo: Todo) => !todo.completed),
          );
        });
    }
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <input
          type="text"
          id="search-query"
          className="App__search"
          value={query}
          placeholder="Type search word"
          onChange={event => setQuery(event.target.value.toLowerCase())}
          data-cy="filterByTitle"
        />
        <select
          value="all"
          className="App__select"
          onChange={selectHandler}
        >
          <option
            value="all"
            disabled
          >
            Choose task status
          </option>
          <option
            value="all"
          >
            Show all
          </option>
          <option
            value="complited"
          >
            Show complited
          </option>
          <option
            value="uncomplited"
          >
            Show uncomplited
          </option>
        </select>
        <TodoList
          todos={todos}
          currentQuery={query}
          changeUser={changeUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              changeUser={changeUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
