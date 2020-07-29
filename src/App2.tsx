import React, { useState, FC } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Todo, User } from './types';

import { loadUsers, loadTodos } from './api';

const App: FC<{}> = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [gotError, setGotError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  const loadData = async (): Promise<[User[], Todo[]]> => {
    const loadedData = await Promise.all([
      loadUsers(),
      loadTodos(),
    ]);

    return loadedData;
  };

  const onLoading = (): void => {
    setLoading(true);

    loadData()
      .then((data) => {
        const [usersData, todosData] = data;

        setUsers(usersData);
        // setTodos(todosData);
        setSortedTodos(todosData);
        setLoading(false);
        setLoaded(true);
        setErrorMessage('');
        setGotError(false);
      })
      .catch(error => {
        setGotError(true);
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {
        (!loaded)
          ? (
            <>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={onLoading}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load'}
              </Button>
              {gotError === true
                && (
                  <p>
                    {errorMessage}
                    {' '}
                    <Button
                      variant="outlined"
                      color="primary"
                      type="button"
                      onClick={onLoading}
                    >
                      Retry Loading
                    </Button>
                  </p>
                )}
            </>
          ) : (
            <div>
              <h2>Users</h2>
              {users.map((user: User) => (
                <p
                  key={user.id}
                >
                  {user.name}
                </p>
              ))}
              <h2>TODO:</h2>
              <div>
                <h3>Sorting by:</h3>
                <ButtonGroup
                  color="primary"
                  variant="outlined"
                  aria-label="outlined primary button group"
                >
                  <Button
                    // onClick={this.onSortByTitle}
                    disabled={loading}
                  >
                    Sort by title
                  </Button>
                  <Button
                    // onClick={this.onSortByComplete}
                    disabled={loading}
                  >
                    Sort by completed
                  </Button>
                  <Button
                    // onClick={this.onSortByUser}
                    disabled={loading}
                  >
                    Sort by user
                  </Button>
                </ButtonGroup>
              </div>
              <ol>
                {sortedTodos.map((todo: Todo) => (
                  <li
                    key={todo.id}
                  >
                    <input
                      type="checkbox"
                      defaultChecked={todo.completed}
                    />
                    {todo.title}
                  </li>
                ))}
              </ol>
            </div>
          )
      }
    </>
  );
};

export default App;
