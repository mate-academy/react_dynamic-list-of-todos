import React, { useMemo, useState } from 'react';
import './App.scss';

import { getUsers, getTodos, Todo } from './helpers/api';
import { TodoCard } from './components/TodoCard';
import { Button } from './components/Button';

const getVisibleTodos = (todos: Todo[], sortType: string) => {

  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'id':
      return [...todos].sort((a, b) => a.id - b.id);

    case 'userName':
      return [...todos].sort((a, b) => {
        return (a.user && b.user)
          ? a.user.name.localeCompare(b.user.name)
          : 0;
      });

    default:
      return todos;
  }
};

const App = () => {
  const [sortType, setSortType] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loadData = async () => {
    setLoading(true);

    try {
      const [todosFromServer, usersFromServer] = await Promise.all(
        [getTodos(), getUsers()],
      );

      const todosWithUsers = todosFromServer.map((todo) => ({
        ...todo,
        user: usersFromServer.find((user) => user.id === todo.userId),
      }));

      setTodos(todosWithUsers);
    } catch (error) {
      setErrorMessage('Loading error, please try again later');
    }

    setLoading(false);
    setIsLoaded(true);
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, sortType);
  }, [todos, sortType]);

  return (
    <div className="wrapper">
      <h1>Dynamic list of TODOs</h1>
      {!isLoaded
        && (
          <>
            <button
              type="button"
              disabled={isLoading}
              className="button waves-effect waves-light btn mgb20"
              onClick={loadData}
            >
              {isLoading ? 'Loading...' : 'load todos'}
            </button>
            {errorMessage && <span className="error">{errorMessage}</span>}
          </>
        )}

      {isLoaded
        && (
          <>
            <div className="buttons">
              <Button setSortType={setSortType} title="Sort by title" sortType="title" />
              <Button setSortType={setSortType} title="Sort by id" sortType="id" />
              <Button setSortType={setSortType} title="Sort by name" sortType="userName" />
            </div>
            <ul className="todo-list">
              {visibleTodos.map(todo => (
                <li key={todo.id} className="todo-list__item">
                  <TodoCard todo={todo} />
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};

export default App;
