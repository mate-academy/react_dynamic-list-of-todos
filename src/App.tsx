import React, { useState } from 'react';
import './App.css';
import { getTODOs, getUsers } from './API';
import TodoList from './TodoList';

const App = () => {
  const [isLoading, setIsLoadind] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setPreparedTodos] = useState([]);
  const [sortTitle, setSortTitle] = useState(false);
  const [sortStatus, setSortStatus] = useState(false);
  const [sortName, setSortName] = useState(false);

  const loadGoods = async () => {
    setIsLoadind(true);

    const [todosFromServer, usersFromServer] = await Promise.all(
      [getTODOs(), getUsers()],
    );

    const preparedTodos = todosFromServer.map((todo: TodoProps) => ({
      ...todo,
      user: usersFromServer.find((user: UserProps) => user.id === todo.userId),
    }));

    setPreparedTodos(preparedTodos);
    setIsLoadind(false);
    setIsLoaded(true);
  };

  const sortByTitle = () => {
    if (!sortTitle) {
      setSortTitle(true);
      setPreparedTodos(prevState => [...prevState]
        .sort((a: TodoProps, b: TodoProps) => (a.title.localeCompare(b.title))));
    } else {
      setSortTitle(false);
      setPreparedTodos(prevState => [...prevState]
        .sort((a: TodoProps, b: TodoProps) => (b.title.localeCompare(a.title))));
    }
  };

  const sortByStatus = () => {
    if (!sortStatus) {
      setSortStatus(true);
      setPreparedTodos(prevState => [...prevState]
        .sort((a: TodoProps, b: TodoProps) => (+b.completed - +a.completed)));
    } else {
      setSortStatus(false);
      setPreparedTodos(prevState => [...prevState]
        .sort((a: TodoProps, b: TodoProps) => (+a.completed - +b.completed)));
    }
  };

  const sortByName = () => {
    if (!sortName) {
      setSortName(true);
      setPreparedTodos(prevState => [...prevState]
        .sort((a: TodoProps, b: TodoProps) => (a.user.name.localeCompare(b.user.name))));
    } else {
      setSortName(false);
      setPreparedTodos(prevState => [...prevState]
        .sort((a: TodoProps, b: TodoProps) => (b.user.name.localeCompare(a.user.name))));
    }
  };

  return (
    <>
      <h1 className="display-5">Dynamic list of TODOs</h1>
      <div className="buttons">
        {!isLoaded && (
          <button
            className="btn btn-primary"
            disabled={isLoading}
            type="button"
            onClick={loadGoods}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        )}

        {isLoaded
    && (
      <>
        <button
          className="btn btn-outline-primary mr"
          type="button"
          onClick={sortByTitle}
        >
          Sort by Title
        </button>

        <button
          className="btn btn-outline-success mr"
          type="button"
          onClick={sortByStatus}
        >
          Sort by Status
        </button>

        <button
          className="btn btn-outline-info"
          type="button"
          onClick={sortByName}
        >
          Sort by Name
        </button>
      </>
    )}
      </div>
      {isLoading
        && <div className="spinner-border text-primary" role="status" />}
      <TodoList todos={todos} />
    </>
  );
};

export default App;
