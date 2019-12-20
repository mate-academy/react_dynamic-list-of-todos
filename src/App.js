import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { getTodosFromServer, getUsersFromServer } from './api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [loadedTodos, setLoadedTodos] = useState([]);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);
  const sortButtons = ['Sort by title', 'Sort by user', 'Sort By Status'];

  const handleLoading = async() => {
    setIsLoading(true);

    const todos = await getTodosFromServer();
    const users = await getUsersFromServer();

    setIsLoading(false);
    setButtonStatus(false);

    const preparedTodos = todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    setLoadedTodos(preparedTodos);

    return preparedTodos;
  };

  const sort = (index) => {
    let sortedTodos = [];

    if (selectedButtonIndex === index) {
      setLoadedTodos([...loadedTodos].reverse());
    } else {
      switch (index) {
        case 0:
          sortedTodos = [...loadedTodos]
            .sort((a, b) => (a.title.localeCompare(b.title)));
          break;
        case 1:
          sortedTodos = [...loadedTodos]
            .sort((a, b) => (a.user.name.localeCompare(b.user.name)));
          break;
        case 2:
          sortedTodos = [...loadedTodos]
            .sort((a, b) => (b.completed - a.completed));
          break;
        default:
      }
      setSelectedButtonIndex(index);
      setLoadedTodos(sortedTodos);
    }
  };

  if (isLoading) {
    return (
      <h1 className="start-page">Loading...</h1>
    );
  }

  return buttonStatus
    ? (
      <div className="start-page">
        <button
          className="button"
          type="button"
          onClick={handleLoading}
        >
          Load goods
        </button>
      </div>
    )
    : (
      <>
        <div className="button-block">
          {sortButtons.map((button, i) => (
            <button
              type="button"
              className={selectedButtonIndex === i ? 'button active' : 'button'}
              onClick={() => sort(i)}
              value={i}
            >
              {button}
            </button>
          ))}
        </div>
        <div className="App">
          <TodoList todos={loadedTodos} />
        </div>
      </>
    );
}

export default App;
