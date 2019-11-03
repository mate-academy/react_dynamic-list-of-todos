import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import TodoList from './components/table/TodoList';
import todos from './api/todos';
import users from './api/users';

function getTodosWithUsers(todoList, userList) {
  return todoList.map(todo => ({
    ...todo,
    user: userList.find(item => item.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    isLoading: false,
    todoList: [],
    userList: [],
    hasError: false,
  };

  getData = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    Promise.all([todos(), users()])
      .then(([todoList, userList]) => {
        this.setState({
          todoList,
          userList,
        });
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

  render() {
    const {
      userList, todoList, isLoading, hasError,
    } = this.state;
    const todosWithUsers = getTodosWithUsers(todoList, userList);

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

    if (!userList.length && !todoList.length) {
      return <Button type="button" onClick={this.getData}>Load</Button>;
    }

    return <TodoList todos={todosWithUsers} />;
  }
}

export default App;
