import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import { getUsers, getTodos } from './Api';
import TodoTable from './components/todoTable/TodoTable';

class App extends React.PureComponent {
  state = {
    todosWithUser: [],
    isLoading: false,
    successfulLoading: false,
    wasLoaded: false,
  };

  getTodosWithUses(todos, users) {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  downloadInfoFromServer = async () => {
    this.setState({
      isLoading: true,
      wasLoaded: true,
    });

    Promise.all([getTodos(), getUsers()])
      .then(([serverTodos, serverUsers]) => this.setState({
        todosWithUser: this.getTodosWithUses(serverTodos, serverUsers),
        isLoading: false,
        successfulLoading: true,
      }))
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  sortTodosByFilter = (filter) => {
    this.setState((prevState) => {
      const newTodoList = [...prevState.todosWithUser];

      switch (filter) {
        case 'title':
          newTodoList.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'userName':
          newTodoList.sort((a, b) => a.user.name.localeCompare(b.user.name));
          break;
        case 'completed':
          newTodoList.sort((a, b) => b.completed - a.completed);
          break;
      }

      return ({
        todosWithUser: newTodoList,
      });
    });
  };

  render() {
    const { todosWithUser, isLoading, successfulLoading, wasLoaded } = this.state;

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
      return <TodoTable
        todosWithUser={todosWithUser}
        titleSort={this.sortTodosByFilter.bind(this, 'title')}
        userNameSort={this.sortTodosByFilter.bind(this, 'userName')}
        completedSort={this.sortTodosByFilter.bind(this, 'completed')}
      />;
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
