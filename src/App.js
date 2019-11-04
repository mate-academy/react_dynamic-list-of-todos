import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import TodoList from './components/table/TodoList';
import { todos, users } from './api/api';

class App extends React.Component {
  state = {
    isLoading: false,
    todosWithUsers: [],
    hasError: false,
  };

  getData = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([todos, users])
      .then(([todoList, userList]) => {
        const todosWithUsers = todoList.map(todo => ({
          ...todo,
          user: userList.find(item => item.id === todo.userId),
        }));
        this.setState({ todosWithUsers });
      })
      .catch(() => {
        this.setState({
          hasError: true,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleSort = (sort) => {
    this.setState(prevState => ({
      todosWithUsers: prevState.todosWithUsers.sort((a, b) => {
        switch (sort) {
          case 'userName':
            return a.user.name.localeCompare(b.user.name);
          case 'completed':
            return b.completed - a.completed;
          default:
            return a.title.localeCompare(b.title);
        }
      }),
    }));
  };

  render() {
    const {
      todosWithUsers, isLoading, hasError,
    } = this.state;
    const sort = this.handleSort;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (hasError) {
      return (
        <>
          <p>Loading failed</p>
          <Button type="button" onClick={this.getData}>Retry</Button>
        </>
      );
    }

    if (!todosWithUsers.length) {
      return <Button type="button" onClick={this.getData}>Load</Button>;
    }

    return <TodoList todos={todosWithUsers} sort={sort} />;
  }
}

export default App;
