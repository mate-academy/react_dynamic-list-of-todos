import React from 'react';
import './App.css';
import TodoList from './component/Todolist';

const getTodos = async() => {
  const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
  return await responce.json();
};

const getUsers = async() => {
  const responce = await fetch('https://jsonplaceholder.typicode.com/users');
  return await responce.json();
};

let todosFromServer = [];

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();
    todosFromServer = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        todos: todosFromServer,
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  render() {
    return (
      <main>
        { this.state.isLoaded ? (
          <div className="App">
            <h1>Dynamic list of todos</h1>
            <TodoList todos={this.state.todos} />
          </div>
        ) : (
          <button className="load" onClick={this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
}

export default App;
