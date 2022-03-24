/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [titleQuery, setTitleQuery] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasErrorFromServer, setHasErrorFromServer] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response))
      .catch(() => setHasErrorFromServer(true));
  }, []);

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
  }, [titleQuery, selectValue, selectedUserId]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <button type="button" className="button" onClick={() => setSelectedUserId(0)}>Clear</button>
        <h2>Todos:</h2>

        <div className="TodoList__nav">
          <input
            type="text"
            className="TodoList__input"
            placeholder="search"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
          />
          <select
            name="select"
            value={selectValue}
            onChange={(event) => setSelectValue(event.target.value)}
          >
            <option defaultValue="allTodos">all</option>
            <option value="completedTodos">completed</option>
            <option value="notCompletedTodos">need to complete</option>
          </select>
        </div>

        {!hasErrorFromServer ? (
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            selectValue={selectValue}
            titleQuery={titleQuery}
            selectId={id => setSelectedUserId(id)}
            changeCompleted={changeCompleted}
          />
        ) : (<p className="App__error">Oops... Can`t read data from server</p>)}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
