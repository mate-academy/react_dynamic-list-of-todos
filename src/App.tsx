import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import { Todo, User } from './types';
import { loadUsers, loadTodos } from './api';

interface State {
  setLoading: boolean;
  setLoaded: boolean;
  gotError: boolean;
  error: string;
  todos: Todo[];
  users: User[];
}

class App extends React.Component<{}, State> {
  state: State = {
    setLoading: false,
    setLoaded: false,
    gotError: false,
    error: '',
    todos: [],
    users: [],
  };

  loadData = async (): Promise<[User[], Todo[]]> => {
    const loadedData = await Promise.all([
      loadUsers(),
      loadTodos(),
    ]);

    return loadedData;
  };

  onLoading = (): void => {
    this.setState((prevState) => ({
      ...prevState,
      setLoading: true,
    }));

    this.loadData()
      .then(([users, todos]) => {
        console.log(users);
        console.log(todos);
        this.setState((prevState: State) => ({
          ...prevState,
          users,
          todos,
          setLoading: false,
          setLoaded: true,
          error: '',
          gotError: false,
        }));
      })
      .catch(error => {
        console.log('error on data loading', error.message);
        this.setState(prevState => ({
          ...prevState,
          error: error.message,
          gotError: true,
        }));
      });
  };

  render() {
    const {
      setLoading,
      setLoaded,
      todos,
      users,
      gotError,
      error,
    } = this.state;

    return (
      <>
        <h1>Dynamic list of TODOs</h1>
        {
          (!setLoaded)
            ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={this.onLoading}
                  disabled={setLoading}
                >
                  {setLoading ? 'Loading...' : 'Load'}
                </Button>
                {gotError === true
                  && (
                    <p>
                      {error}
                      {' '}
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={this.onLoading}
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

                </div>
                <ol>
                  {todos.map((todo: Todo) => (
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
  }
}

export default App;
