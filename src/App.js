import React from 'react';
import './App.css';
import { Button, Segment } from 'semantic-ui-react';
import TodoList from './components/TodoList';

import { getTodo } from './API/getTodos';
import { getUsers } from './API/users';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => todo.userId === user.id),
  }));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      todoList: [],
      isLoading: false,
      error: false,
      initialized: false,
    };
  }

  loadData = () => {
    this.setState({
      isLoading: true,
      error: false,
      initialized: true,
    });

    Promise.all([getTodo(), getUsers()])
      .then(([todoList, userList]) => {
        this.setState({
          todoList,
          userList,
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
          initialized: true,
        });
      });
  };

  render() {
    const {
      todoList, userList, isLoading, error,
    } = this.state;
    const preparedTodos = getTodosWithUsers(todoList, userList);

    if (isLoading) {
      return <p>loading...</p>;
    }

    if (error) {
      return (
        <>
          <p>Error occurred!!!</p>
;
          <Button
            type="button"
            onClick={this.loadData}
            inverted
            color="red"
          >
            Try Again!
          </Button>
        </>
      );
    }

    if (todoList.length === 0 && userList.length === 0) {
      return (
        <>
          <p>No users and todos yet!</p>
          <Button type="button" onClick={this.loadData} color="green">
            Load
          </Button>
        </>
      );
    }

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
