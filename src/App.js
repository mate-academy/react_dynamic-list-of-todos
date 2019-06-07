import React, { Component } from 'react';
import TodoList from './components/TodoList';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requested: false,
      loaded: false,
    };
  }

  requestData = () => {
    this.setState({
      requested: true,
    })

    const TodosResp = fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json());

    const UsersResp = fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());

    Promise.all([TodosResp, UsersResp])
      .then(([todos, users]) => {
        [this.todos, this.users] = [todos, users];

        this.usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
        this.todosWithUsers = todos.map(todo => ({ ...todo, user: this.usersMap[todo.userId] }));
        
        this.setState({
          loaded: true,
        })
      })
  }

  render() {
    if (this.state.loaded) {
      return (
        <table>
          <thead>
            <tr>
              <th>TODO</th>
              <th>Name</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            <TodoList todos={this.todosWithUsers} />
          </tbody>
        </table>
      )
    } else {
      return (
        <button
          onClick={this.requestData}
          disabled={this.state.requested}>
          {this.state.requested ? "Loading..." : "Load Data"}
        </button>
      )
    }
  }
}
