import React, { useState } from 'react';
import { TodosList } from './Components/TodosList/TodosList';
import {
  getUsers, getTodos, Todo,
} from './Helpers/api';

import './App.css';

const getVisibleTodos = (todos: Todo[], sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });

    case 'completion':
      return [...todos].sort((a) => (a.completed ? 1 : -1));

    case 'name':
      return [...todos].sort((a, b) => {
        return a.user && b.user
          ? a.user.name.localeCompare(b.user.name)
          : 0;
      });

    default:
      return todos;
  }
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sortType, setSortType] = useState('');

  const startLoadingFromServer = async () => {
    setLoading(true);

    try {
      const todosFromServer = await getTodos();
      const usersFromServer = await getUsers();

      const preparedTodos = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setTodos(preparedTodos);
      setIsLoaded(true);
    } catch (error) {
      setIsError(true);
    }
  };

  // const reset = () => {
  //   console.log('reset');
  //   setTodos(todos);
  // };

  const visibleTodos = getVisibleTodos(todos, sortType);

  return (
    <div className="App">
      {!isLoaded ? (
        <>
          <button type="button" onClick={startLoadingFromServer} disabled={loading}>
            <span>{!loading ? 'Load' : 'Loading...'}</span>
          </button>
          <p>{isError && 'Please reload the page'}</p>
        </>
      ) : (
          (todos.length > 0)
          && (
            <>
              <div className="buttons__list">
                <button type="button" onClick={() => setSortType('')}>
                  <span>reset</span>
                </button>
                <button type="button" onClick={() => setSortType('name')}>
                  <span>sort by name</span>
                </button>
                <button type="button" onClick={() => setSortType('title')}>
                  <span>sort by title</span>
                </button>
                <button type="button" onClick={() => setSortType('completion')}>
                  <span>sort by completion</span>
                </button>
              </div>

              <TodosList todos={visibleTodos} />
            </>
          )
        )}
    </div>
  );
};

export default App;
