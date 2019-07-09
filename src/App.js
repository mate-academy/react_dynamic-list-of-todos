import React from 'react';
import './App.css';

import TodoList from './TodoList';

let listOfTodo = [];
const todosFromServer = 'https://jsonplaceholder.typicode.com/todos';
const usersFromServer = 'https://jsonplaceholder.typicode.com/users';

const getTodos = async() => {
  const response = await fetch(todosFromServer);
  const todos = await response.json();
  return todos;
};

const getUsers = async() => {
  const response = await fetch(usersFromServer);
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

    listOfTodo = todos.map(todo => ({
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
        todos: listOfTodo,
        isLoaded: true,
        isLoading: false,
      });
    }, 350);
  };

  render() {
    return (
      <main class ="App-container">
        {this.state.isLoaded ? (
          <div className="App">
            <h1>List of todos</h1>
            <TodoList todo={this.state.todos} />
          </div>
            ) : (
          <button className="App__load-button" onClick={this.handleClick}>
              {this.state.isLoading ? 'Fetching...' : 'Get data'}
            </button>
            )}
      </main>
        )
  }
}

        export default App;
