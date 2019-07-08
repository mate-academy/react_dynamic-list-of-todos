import React from 'react';
import './App.css';
import TodoList from './TodoList';

const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const currentTodos = await response.json();

  return currentTodos;
};

const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const currentUsers = await response.json();

  return currentUsers;
};

class App extends React.Component {
  state = {
    listOfTodos: [],
    isLoaded: false,
    isLoading: false,
  };

  handleClick = async() => {
    const todos = await getTodos();
    const users = await getUsers();
    const prepared = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
    this.setState({
      listOfTodos: prepared,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    return (
      <div>

        { this.state.isLoaded ? (
          <div className="App">
            <TodoList currentTodos={this.state.listOfTodos} />
          </div>
        ) : (
          <button type="button" onClick={this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </div>
    );
  }
}

export default App;
