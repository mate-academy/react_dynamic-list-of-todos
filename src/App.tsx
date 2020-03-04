import React, { FC, useState } from 'react';
import './App.css';

import { USERS_URL, TODOS_URL } from './constants/urls';
import { getData } from './utils/api';

import { TodoList } from './components/TodoList/TodoList';

const getUsers = async (): Promise<User[]> => {
  return getData<User[]>(USERS_URL);
};

const getTodos = async (): Promise<Todo[]> => {
  return getData<Todo[]>(TODOS_URL);
};

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [, setUsers] = useState<User[]>([]);
  const [todosWithUsers, setTodosWithUsers] = useState<TodosWithUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClickLoad = () => {
    setIsLoading(true);

    Promise.all([getUsers(), getTodos()])
      .then(([usersFromApi, todosFromApi]) => {
        setUsers(usersFromApi);
        setTodos(todosFromApi);
        setTodosWithUsers(todosFromApi.map(todo => ({
          ...todo,
          user: usersFromApi.find(user => user.id === todo.userId),
        })));
      })
      .finally(() => setIsLoading(false));
  };

  const handleSortName = () => {

    setTodosWithUsers([...todosWithUsers].sort((a, b) => {
      if (a.user && b.user) {
        return a.user.name.localeCompare(b.user.name);
      }

      return 0;
    }));
  };

  const handleSortTitle = () => {

    setTodosWithUsers([...todosWithUsers].sort((a, b) => {
      return a.title.localeCompare(b.title);
    }));
  };

  const handleSortReadiness = () => {

    setTodosWithUsers([...todosWithUsers].sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    }));
  };

  if (!todos.length) {
    return (
      <div className="App">
        <h1 className="title">Dynamic list of TODOs</h1>
        <>
          <button
            type="button"
            className="button button-start"
            onClick={handleClickLoad}
            disabled={isLoading}
          >
            Load
          </button>
        </>
        {isLoading && (
          <p className="text">Loading...</p>
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Dynamic list of TODOs</h1>
      <div className="buttons">
        <button
          type="button"
          className="button"
          onClick={handleSortName}
        >
          Sort by name
        </button>
        <button
          type="button"
          className="button"
          onClick={handleSortTitle}
        >
          Sort by title
        </button>
        <button
          type="button"
          className="button"
          onClick={handleSortReadiness}
        >
          Sort by readiness
        </button>
      </div>
      <TodoList todos={todosWithUsers} />
    </div>
  );
};

export default App;
