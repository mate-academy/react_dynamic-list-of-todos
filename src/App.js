import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

function getUser(userId) {
  return users.find(user => user.id === userId);
}

const todosWithUser = todos.map((todo) => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

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
