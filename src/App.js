import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { getTodosFromServer, getUsersFromServer } from './Api';

function App() {
  const [loadedTodos, setLoadedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);

  const sortedButtons = ['Sort by user', 'Sort by title', 'Sort By Status'];

  const handleLoading = async() => {
    setIsLoading(true);

    // eslint-disable-next-line max-len
    const [todosFromServer, usersFromServer] = await Promise.all([getTodosFromServer(), getUsersFromServer()]);
    const newTodos = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setIsLoading(false);
    setButtonStatus(false);

    setLoadedTodos(newTodos);

    return newTodos;
  };

  const sort = (index) => {
    let sortedTodos = [];

    if (selectedButtonIndex === index) {
      setLoadedTodos([...loadedTodos].reverse());
    } else {
      switch (index) {
        case 0:
          sortedTodos = [...loadedTodos]
            .sort((a, b) => (a.user.name.localeCompare(b.user.name)));
          break;
        case 1:
          sortedTodos = [...loadedTodos]
            .sort((a, b) => (a.title.localeCompare(b.title)));
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
      <h1>Loading</h1>
    );
  }

  return buttonStatus
    ? (
      <div>
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
        <div>
          {sortedButtons.map((button, i) => (
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
        <div>
          <TodoList todos={loadedTodos} />
        </div>
      </>
    );
}

export default App;
