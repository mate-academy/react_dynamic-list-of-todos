import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { Todo } from './types';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState([]);

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [randomArr, setRandomArr] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const getVisibleTodos = useMemo(() => {
    let newArr = todos.filter(
      (todo: Todo) => todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
    );

    if (randomArr) {
      for (let i = newArr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));

        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
    }

    switch (sortBy) {
      case 'active':
        newArr = newArr.filter((todo: Todo) => todo.completed === false);
        break;
      case 'completed':
        newArr = newArr.filter((todo: Todo) => todo.completed === true);
        break;
      default:
        break;
    }

    return newArr;
  }, [todos, query, sortBy, randomArr]);

  const changeUser = (id: number): void => {
    setSelectedUserId(id);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <div className="TodoList__filters">
          <input
            className="TodoList__filter TodoList__input"
            type="text"
            value={query}
            placeholder="Type search todo..."
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />

          <select
            className="TodoList__filter TodoList__select"
            defaultValue={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value);
              setRandomArr(false);
            }}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>

          <button
            className="TodoList__filter TodoList__btn"
            type="button"
            onClick={() => {
              setRandomArr(!randomArr);
            }}
          >
            {'Randomize '}
            {randomArr ? 'ON' : 'OFF'}
          </button>
        </div>
        <TodoList
          selectedUserId={selectedUserId}
          todos={getVisibleTodos}
          changeUser={changeUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              changeUser={changeUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
