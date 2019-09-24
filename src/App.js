import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import DataFromServer from './components/DataFromServer/DataFromServer';
import getTodosWithUsers from './dataMappers';
import './App.css';

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = {
    todosWithUsers: [],
    isDataLoaded: false,
  }

  getDataFromServer = (todosFromServer, usersFromServer) => {
    this.setState(prevState => ({
      isDataLoaded: !prevState.isDataLoaded,
      todosWithUsers: getTodosWithUsers(todosFromServer, usersFromServer),
    }));
  };

  render() {
    const { todosWithUsers, isDataLoaded } = this.state;

    return isDataLoaded
      ? (
        <TodoList todos={todosWithUsers} />
      )
      : (
        <DataFromServer
          todosUrl={todosUrl}
          usersUrl={usersUrl}
          getDataFromServer={this.getDataFromServer}
        />
      );
  }
}

export default App;
