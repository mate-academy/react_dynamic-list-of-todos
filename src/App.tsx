import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodo } from './api/api';

enum Filters{
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');
  const [random, setRandom] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      getAllTodo().then(todosFromServer => setTodos(todosFromServer));
    } catch {
      setTodos([]);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const copyTodo = [...todos]
      .filter(todo => todo.title.includes(filterValue))
      .filter(todo => {
        switch (selectedValue) {
          case Filters.ALL:
            return true;
          case Filters.COMPLETED:
            return todo.completed;
          case Filters.ACTIVE:
            return !todo.completed;
          default:
            return true;
        }
      });

    if (random !== 0) {
      copyTodo.sort(() => 0.5 - Math.random());
    }

    setVisibleTodos(copyTodo);
  }, [filterValue, todos, selectedValue, random]);

  const selectId = (userId: number) => {
    setIsLoading(true);
    setSelectedUserId(userId);
    setIsLoading(false);
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
            <option value={Filters.ALL}>{Filters.ALL}</option>
            <option value={Filters.ACTIVE}>{Filters.ACTIVE}</option>
            <option value={Filters.COMPLETED}>{Filters.COMPLETED}</option>
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
        { isLoading
          ? (
            <img
              src="./image/Spinner-3.gif"
              alt="Loading"
              width="100px"
              height="100px"
            />
          )
          : (
            <TodoList
              todos={visibleTodos}
              selectedUserId={selectedUserId}
              selectId={selectId}
            />
          )}
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
