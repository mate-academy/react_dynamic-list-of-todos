import React from 'react';
import './App.css';

import getTodos from './api/getTodos';
import getUsers from './api/getUsers';
import TodoList from './Components/TodoList';

let usersWithTodos = [];

class App extends React.Component {
  state = {
    usersData: [],
    isLoaded: false,
    isLoading: false,
  };

  async componentDidMount() {
    const users = await getUsers();
    const todos = await getTodos();

    usersWithTodos = users.map(user => ({
      ...user,
      todo: todos.find(todo => todo.userId === user.id),
    }));
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        usersData: usersWithTodos,
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  render() {
    return (
      <div className="App">
        { this.state.isLoaded ? (
          <>
            <h1 className="main-title">Dynamic list of todos</h1>

            <TodoList usersData={this.state.usersData} />
          </>
        ) : (
          <button type="button" onClick={this.handleClick} className="load-btn">
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </div>
    );
  }
}

export default App;
