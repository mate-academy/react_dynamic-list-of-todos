import React from 'react';
import './App.css';
import TodoList from './TodoList';

let todosWithUser = [];

const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  return todos;
};

const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const todos = await response.json();
  return todos;
};

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();

    todosWithUser = todos.map(todo => ({
      ...todo,
      user: users.find(user => (user.id === todo.userId)),
    }));
  }

  handleClick = () => {
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

  sortByName = () => {
    this.setState(prevState => ({
      todos:
        prevState.todos.sort((a, b) => (a.user.name > b.user.name) ? 1 : -1),
    }));
  };

  sortByTodos = () => {
    this.setState(prevState => ({
      todos:
        prevState.todos.sort((a, b) => (a.title > b.title) ? 1 : -1),
    }));
  };

  sortByComplete = () => {
    this.setState(prevState => ({
      todos:
        prevState.todos.sort((a, b) => (a.completed > b.completed) ? -1 : 1),
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>


        {this.state.isLoaded
        ? (
          <div> Sort by: {' '}
            <button onClick={this.sortByName}>Name</button>
            <button onClick={this.sortByTodos}>Todos</button>
            <button onClick={this.sortByComplete}>Complete</button>
            <TodoList todo = {this.state.todos} />
          </div>
        )
        : (
          <button onClick = {this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </div>
    );
  }
};

export default App;
