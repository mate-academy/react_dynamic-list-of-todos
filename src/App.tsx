import React, { useState } from 'react';
import './App.css';
import { TodoItem } from './components/TodoItem';
import LoadingButtons from './components/LoadingButtons';
import SortButtons from './components/SortButtons';
import { getUsers, getTodos, Todo } from './helpers/api';

const App = () => {
  const [defaultTodos, setDefaultTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoadClick = async () => {
    setIsLoading(true);

    try {
      const todosFromServer = await getTodos();
      const usersFromServer = await getUsers();

      const todosWithUsers = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setDefaultTodos(todosWithUsers);
      setTodos(todosWithUsers);
    } catch (error) {
      setErrorMessage('Errors happens, try to reload');
    }

    setIsLoading(false);
  };

  const sortByTitle = () => {
    const sortedTodos = [...defaultTodos].sort((a, b) => a.title.localeCompare(b.title));

    setTodos(sortedTodos);
  };

  const sortById = () => {
    const sortedTodos = [...defaultTodos].sort((a, b) => a.id - b.id);

    setTodos(sortedTodos);
  };

  const sortByUser = () => {
    const sortedTodos = [...defaultTodos].sort((a, b) => {
      return a.user && b.user
        ? a.user?.name.localeCompare(b.user.name)
        : 0;
    });

    setTodos(sortedTodos);
  };

  const makeDefaultOrder = () => {
    setTodos(defaultTodos);
  };

  return (
    <div className="app">
      <h1>Dynamic list of TODOs</h1>

      <LoadingButtons
        todos={todos}
        isLoading={isLoading}
        handleLoadClick={handleLoadClick}
        errorMessage={errorMessage}
      />

      <SortButtons
        todos={todos}
        sortByTitle={sortByTitle}
        sortById={sortById}
        sortByUser={sortByUser}
        makeDefaultOrder={makeDefaultOrder}
      />

      {/* <div className="sorting-btns" hidden={todos.length === 0}>
        <button
          type="button"
          className="btn btn-success btn-sort"
          onClick={sortByTitle}
        >
          Sort by Title
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sort"
          onClick={sortById}
        >
          Sort by ID
        </button>
        <button
          type="button"
          className="btn btn-warning btn-sort"
          onClick={sortByUser}
        >
          Sort by User
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sort"
          onClick={makeDefaultOrder}
        >
          RESET
        </button>
      </div> */}

      <ul className="cards__list">
        {todos.map(todo => (
          <li key={todo.title}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
