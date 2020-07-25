import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import { Todo, User } from './types';
import { loadUsers, loadTodos } from './api';

interface State {
  setLoading: boolean;
  setLoaded: boolean;
  todos: Todo[];
  users: User[];
}

class App extends React.Component<{}, State> {
  state: State = {
    setLoading: false,
    setLoaded: false,
    todos: [],
    users: [],
  };

  onLoading = (): void => {
    loadUsers()
      .then((users) => {
        console.log(users);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loadTodos()
          .then((todos) => {
            console.log(todos);
          })
          .catch(error => {
            console.log(error);
          });
      });
  };

  render() {
    const {
      setLoading,
      setLoaded,
      todos,
      users,
    } = this.state;

    return (
      <>
        <h1>Dynamic list of TODOs</h1>
        {
          (!setLoaded)
            ? (
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.onLoading}
              >
                {setLoading ? 'Loading...' : 'Load'}
              </Button>
            ) : (
              <div>
                here will be some list of
                {users}
                {todos}
              </div>
            )
        }
      </>
    );
  }
}

export default App;
