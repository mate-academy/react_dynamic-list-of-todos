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
    direction: 1,
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
    const direction = this.state.direction > 0 ? -1 : 1;
    this.setState(prevState => ({
      todos:
        prevState.todos.sort((a, b) => a.user.name.localeCompare(b.user.name) * direction),
        direction: prevState.direction > 0 ? -1 : 1,
    }));
  };

  sortByTodos = () => {
    const direction = this.state.direction > 0 ? -1 : 1;
    this.setState(prevState => ({
      todos:
        prevState.todos.sort((a, b) => a.title.localeCompare (b.title) * direction),
        direction: prevState.direction > 0 ? -1 : 1,
    }));
  };

  sortByComplete = () => {
    const direction = this.state.direction > 0 ? -1 : 1;
    this.setState((prevState) => ({
      todosWithUser:
        todosWithUser.sort((a, b) => (a.completed - b.completed) * direction),
        direction: prevState.direction > 0 ? -1 : 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>


        {this.state.isLoaded
        ? (
            <TodoList
            todo={this.state.todos}
            sortByName={this.sortByName}
            sortByTodos={this.sortByTodos}
            sortByComplete={this.sortByComplete}
             />
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
