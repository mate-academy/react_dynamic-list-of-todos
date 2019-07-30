import React from 'react';
import './App.css';
import TodoItem from './TodoItem';

const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const result = await response.json();

  return result;
};

const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await response.json();

  return result;
};

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoaded: false,
    isLoading: false,
  }

  handleClick = async() => {
    const todosInfo = await getTodos();
    const usersInfo = await getUsers();

    this.setState({
      todos: todosInfo,
      users: usersInfo,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  }

  render() {
    const {
      todos, isLoaded, isLoading, users,
    } = this.state;
    const todoItems = todos.map(
      todo => <TodoItem key={todo.id} todo={todo} users={users} />
    );

    return (
      <div className="mainBlock">
        {(isLoaded)
          ? todoItems
          : (
            <button
              type="button"
              onClick={() => this.handleClick()}
              className="button"
              disabled={this.state.isLoading}
            >
              {(isLoading) ? 'Loading...' : 'Load'}
            </button>
          )
        }
      </div>
    );
  }
}

export default App;
