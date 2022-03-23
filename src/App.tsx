/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [filtered, setFiltered] = useState('');
  const [selectFilter, setSelectFilter] = useState('allTodos');
  const [selectUserId, setSelectUserId] = useState(0);
  const [errorFromServer, setErrorFromServer] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response))
      .catch(() => setErrorFromServer(true));
  }, []);

  const selectNewUser = (id: number) => {
    setSelectUserId(id);
  };

  const setNewFilter = (value: string) => {
    setFiltered(value);
  };

  const newSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilter(e.target.value);
  };

  const changeCompleted = (todoId: number) => {
    setTodos([...todos].map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }

      return todo;
    }));
  };

  useEffect(() => {
    setTodos([...todos]);
  }, [filtered, selectFilter, selectUserId]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <button type="button" className="button" onClick={() => setSelectUserId(0)}>Clear</button>
        <h2>Todos:</h2>

        <div className="TodoList__nav">
          <input
            type="text"
            className="TodoList__input"
            placeholder="search"
            value={filtered}
            onChange={(e) => setNewFilter(e.target.value)}
          />
          <select name="select" value={selectFilter} onChange={newSelectFilter}>
            <option defaultValue="allTodos">all</option>
            <option value="completedTodos">completed</option>
            <option value="notCompletedTodos">need to complete</option>
          </select>
        </div>

        {!errorFromServer ? (
          <TodoList
            todos={todos}
            selectId={selectNewUser}
            activeUser={selectUserId}
            changeCompleted={changeCompleted}
            setNewFilter={setNewFilter}
            filtered={filtered}
            selectFilter={selectFilter}
          />
        ) : (<p className="App__error">Oops... Can`t read data from server</p>)}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectUserId ? (
            <CurrentUser
              userId={selectUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
