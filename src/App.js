import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import { getUsers, getTodos } from './Api';
import TodoTable from './components/todoTable/TodoTable';

class App extends React.PureComponent {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    successfulLoading: false,
    wasLoaded: false,
  };

  downloadInfoFromServer = async () => {
    this.setState({
      isLoading: true,
      wasLoaded: true,
    });

    const [serverTodos, serverUsers] = await Promise.all([getTodos(), getUsers()])
      .catch(() => {
        this.setState({ isLoading: false });
      });

    this.setState({
      todos: serverTodos,
      users: serverUsers,
      isLoading: false,
      successfulLoading: true,
    });
  };

  render() {
    const { todos, users, isLoading, successfulLoading, wasLoaded } = this.state;
    console.log(this.state);

    if (isLoading) {
      return (
        <Button secondary loading>
          Loading
        </Button>
      );
    } else if (!successfulLoading && !wasLoaded) {
      return (
        <Button secondary onClick={this.downloadInfoFromServer}>
          Load info from server
        </Button>
      );
    }

    if (successfulLoading) {
      return <TodoTable todos={todos} users={users} />;
    } else if (!successfulLoading && wasLoaded) {
      return (
        <>
          <h3>Loading error</h3>
          <Button secondary onClick={this.downloadInfoFromServer}>
            Try again
          </Button>
        </>
      );
    }
  }
}

export default App;
