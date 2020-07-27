import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import './App.css';
import { Todo, User } from './types';
import { loadUsers, loadTodos } from './api';

interface State {
  setLoading: boolean;
  setLoaded: boolean;
  gotError: boolean;
  error: string;
  todos: Todo[];
  sortedTodos: Todo[];
  users: User[];
}

const initState: State = {
  setLoading: false,
  setLoaded: false,
  gotError: false,
  error: '',
  todos: [],
  sortedTodos: [],
  users: [],
};

const compareByTitle = (a: Todo, b: Todo) => (
  a.title.localeCompare(b.title)
);

const compareByCompleted = (a: Todo, b: Todo) => (
  (a.completed && !b.completed) ? -1 : 1
);

const compareByUser = (users: User[]) => {
  return (a: Todo, b: Todo) => {
    const userA = users
      .find((user) => (user.id === a.userId));
    const userB = users
      .find((user) => (user.id === b.userId));

    if (userA && userB) {
      const nameA = userA.name;
      const nameB = userB.name;

      return nameA.localeCompare(nameB);
    }

    return 0;
  };
};

class App extends React.Component<{}, State> {
  state: State = initState;

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
        this.setState((prevState: State) => ({
          ...prevState,
          users,
          todos,
          sortedTodos: todos,
          setLoading: false,
          setLoaded: true,
          error: '',
          gotError: false,
        }));
      })
      .catch(error => {
        this.setState(prevState => ({
          ...prevState,
          error: error.message,
          gotError: true,
        }));
      });
  };

  onSortByTitle = (): void => {
    const {
      todos,
    } = this.state;

    this.setState((prevState: State) => ({
      ...prevState,
      sortedTodos: todos.sort(compareByTitle),
    }));
  };

  onSortByComplete = (): void => {
    const {
      todos,
    } = this.state;

    this.setState((prevState: State) => ({
      ...prevState,
      sortedTodos: todos.sort(compareByCompleted),
    }));
  };

  onSortByUser = (): void => {
    const {
      todos,
      users,
    } = this.state;

    this.setState((prevState: State) => ({
      ...prevState,
      sortedTodos: todos.sort(compareByUser(users)),
    }));
  };

  render() {
    const {
      setLoading,
      setLoaded,
      sortedTodos,
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
                  <ButtonGroup
                    color="primary"
                    variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      onClick={this.onSortByTitle}
                      disabled={setLoading}
                    >
                      Sort by title
                    </Button>
                    <Button
                      onClick={this.onSortByComplete}
                      disabled={setLoading}
                    >
                      Sort by completed
                    </Button>
                    <Button
                      onClick={this.onSortByUser}
                      disabled={setLoading}
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
  }
}

export default App;
