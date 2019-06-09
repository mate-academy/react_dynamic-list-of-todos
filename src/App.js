import React, { Component } from 'react';
import TodoList from './components/TodoList';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requested: false,
      loaded: false,
      todosWithUsers: [],
    };
  }

  getData(url) {
    return fetch(url).then(response => response.json());
  }

  requestData = () => {
    this.setState({
      requested: true,
    })

    Promise.all([
      this.getData('https://jsonplaceholder.typicode.com/todos'),
      this.getData('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([todos, users]) => {
        const usersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
        this.state.todosWithUsers = todos.map(todo => ({ ...todo, user: usersMap[todo.userId] }));

        this.setState({
          loaded: true,
        });
      });
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
            <TodoList todos={this.state.todosWithUsers} />
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
