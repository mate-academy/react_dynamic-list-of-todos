import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

const dataTodos = `https://jsonplaceholder.typicode.com/todos`;
const dataUsers = `https://jsonplaceholder.typicode.com/users`;


class App extends Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  } // started oprions

  getTodosWithUsers = (todos, usersList) => (todos.map(
    todo => ({
      ...todo,
      user: usersList.find(item => item.id === todo.userId),
    })
  ));

  handleClick = async () => {
    this.setState({ isLoading: true });
    // after click default p-r changes from - to +
    try {
      const [responseTodos, responseUsers] = await Promise.all([
        fetch(dataTodos),
        fetch(dataUsers),
      ]);

      const todos = await responseTodos.json();
      const users = await responseUsers.json();// change to json format

      this.setState({
        todos,
        users,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true, // some error occured
        isLoading: false, // not loading
      });
    }
  };

  render() {
    const {
      todos,
      users,
      isLoading,
      isLoaded,
      hasError,
    } = this.state // her options
    const textOnButton = (hasError ? 'Try again' : 'Load todos');
    // special parameter for button option

    return (
      <div className="App">
        {isLoaded ? ( // first option if load was successfull
          <>
            <h1>Static list of todos</h1>
            <TodoList todos={this.getTodosWithUsers(todos, users)} />
          </>
        ) : (
          <>
            <h1>
              {hasError ? 'Error - failed to fetch' : 'Load'}
            </h1>
            <button type="button" onClick={this.handleClick}>
              {isLoading ? 'Loading..' : textOnButton}
            </button>
          </>
        )
        }
      </div>
    );
  }
}

export default App;
