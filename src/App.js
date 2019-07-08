import React from 'react';
import TodoList from './components/TodoList';

import './App.css';

const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todosFromServer = await response.json();
  return todosFromServer;
};

const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const usersFromServer = await response.json();
  return usersFromServer;
};

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  handleClick = async() => {
    const todos = await getTodos();
    const users = await getUsers();
    const todosWithUser = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        todos: todosWithUser,
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    return (
      <div className="App">
        {this.state.isLoaded
          ? (<h1>Todo List</h1>
          ) : (
            <button
              type="button"
              className="button-load"
              onClick={this.handleClick}
            >
              {this.state.isLoading ? 'Loading...' : 'Load'}
            </button>
          )
        }
        <TodoList
          todos={this.state.todos}
        />
      </div>
    );
  }
}
export default App;
