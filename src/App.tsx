import React, { useState, useMemo } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './helpers/api';
import { TodoList } from './components/TodoList/TodoList';
import { TodoButton } from './components/TodoButton/TodoButton';
import { getSortedTodos } from './helpers/helpers';

const App = () => {
  const [sortType, setSortType] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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

      setTodos(todosWithUsers);
      setIsLoaded(true);

      if (todosWithUsers.length === 0) {
        setErrorMessage('No Todos, try again later.');
      } else {
        setErrorMessage('');
      }
    } catch (exeption) {
      setErrorMessage('Network error, try again.');
    }

    setIsLoading(false);
  }

  const reset = () => {
    setSortType('');
  }

  const sortListByTitle = () => {
    setSortType('title');
  }

  const sortListByUser = () => {
    setSortType('author');
  }

  const sortListByStatus = () => {
    setSortType('status');
  }

  const sortedTodos = useMemo(() => {
    return getSortedTodos(todos, sortType);
  }, [todos, sortType]);

  return (
    <div className="todo">
      <h1 className="todo__title">List of Todos</h1>

      {!isLoaded ? (
        <>
          {errorMessage && <span className="todo__error">{errorMessage}</span>}

          <TodoButton
            title="Load"
            handleClick={handleLoadClick}
            status={isLoading}
          />
        </>
      ) : (
        !errorMessage.length ? (
          <>
            <div className="todo__sort-buttons">
              <TodoButton
                title="Sort by title"
                handleClick={sortListByTitle}
                status={isLoading}
              />
              <TodoButton
                title="Sort by authors"
                handleClick={sortListByUser}
                status={isLoading}
              />
              <TodoButton
                title="Sort by status"
                handleClick={sortListByStatus}
                status={isLoading}
              />
              <TodoButton
                title="Reset"
                handleClick={reset}
                status={isLoading}
              />
            </div>
            <TodoList todoList={sortedTodos} />
          </>
        ) : (
          <>
            <span className="todo__error">{errorMessage}</span>

            <TodoButton
              title="Reload"
              handleClick={handleLoadClick}
              status={isLoading}
            />
          </>
        )
      )}
    </div>
  );
};

export default App;
