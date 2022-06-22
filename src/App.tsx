import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(1);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [done, setDone] = useState('0');

  // eslint-disable-next-line max-len
  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    getTodos().then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, []);

  return (
    <div className="App">
      <div className="App__box">
        <h1>
          Please fill out the fields to find needed todo:
        </h1>

        <div>
          <label htmlFor="todo">Serch Todo:</label>
          <input
            className="input"
            placeholder="Please enter Todo"
            type="text"
            value={query}
            id="todo"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="selectStatus">Select status:</label>
          <select
            name="done"
            value={done}
            id="selectStatus"
            onChange={(event) => {
              setDone(event.target.value);
            }}
          >
            <option
              value="0"
              disabled
            >
              Please select status
            </option>

            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>

          </select>
        </div>

      </div>
      <div className="App__sidebar">
        {todos && (
          <TodoList
            todos={todos}
            selectUser={selectUser}
            query={query}
            done={done}
          />
        )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              selectUser={selectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
