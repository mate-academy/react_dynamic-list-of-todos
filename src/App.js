import React, { Component } from 'react';
import Button from './components/Button/Button';
import TodoList from './components/TodoList/TodoList';

import './App.css';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = {
    todos: [],
    users: [],
    notShown: true,
  };

  componentDidMount() {
    Promise.all([
      fetch(TODOS_URL),
      fetch(USERS_URL),
    ])
      .then(([resTodos, resUsers]) => Promise.all(
        [resTodos.json(), resUsers.json()]
      ))
      .then(([dataTodos, dataUsers]) => this.setState({
        todos: dataTodos,
        users: dataUsers,
      }));
  }

  getTodosWithUsers = (todosList, usersList) => todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }))

  handleShow = () => {
    this.setState({
      notShown: false,
    });
  };

  render() {
    const { todos, users, notShown } = this.state;
    console.log('todos', todos);
    console.log('users', users);
    const preparedTodos = this.getTodosWithUsers(todos, users);

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <div className="container">
          {notShown
            ? (
              <Button
                className="btn--start"
                text="Start"
                onClick={this.handleShow}
              />
            )
            : (
              <div className="content">
                <p>
                  <span>Todos: </span>
                  {todos.length}
                </p>

                <p>
                  <span>Users: </span>
                  {users.length}
                </p>
                <TodoList todos={preparedTodos} />
              </div>
            )
          }
        </div>

      </div>
    );
  }
}

export default App;
