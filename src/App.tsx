import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodo } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');
  const [random, setRandom] = useState(0);

  useEffect(() => {
    getAllTodo().then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const selectId = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <label htmlFor="filterTitle">
          Filter by title:
          <input
            id="ilterTitle"
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="filterSelect">
          Select Filter:
          <select
            id="filterSelect"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <br />
        <button
          type="button"
          className="button"
          onClick={() => setRandom(Math.random())}
        >
          Randomize
        </button>
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          filterValue={filterValue}
          selectedValue={selectedValue}
          random={random}
          selectId={selectId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
