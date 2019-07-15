import React from 'react';
import './App.css';

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

  render() {
    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>

        {this.state.isLoaded
        ? (<TodoList todos = {this.state.todos} />)
        : (
          <button onClick = {this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </div>
    );
  }
};

const TodoList = (props) => (
  <ul>
    {props.todos.map(todo => (
      <TodoItem todo = {todo}/>
    ))}
  </ul>
);

const TodoItem = (props) => (
  <li>
    <input type="checkbox" checked = {props.todo.completed} />
    <div>{props.todo.title}</div>
    <User user = {props.todo.user}/>
  </li>
);

const User = (props) => (
  <div>{props.user.name}</div>
);

export default App;
