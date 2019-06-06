import React, { Component } from 'react'
import TodoItem from './TodoItem'


export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      requested: false
    };
    this.todos = [];
    this.users = [];
    this.list = [];
  }

  requestData = () => {
    this.setState({
      requested: true,
    })
    const TodosResp = fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())

    const UsersResp = fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())

    Promise.all([TodosResp, UsersResp])
      .then(([todos, users]) => {
        [this.todos, this.users] = [todos, users];

        this.todos.forEach(todo => {
          this.list.push(<TodoItem  todo={todo} user={this.users[this.users.findIndex(el => el.id === todo.userId)]} />)
        })

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
              <th>Complited</th>
            </tr>
          </thead>
          <tbody>
            {this.list}
          </tbody>
        </table>
      )
    } else {
      return (
      <button 
        onClick={this.requestData} 
        disabled={this.state.requested}>
        {this.state.requested ? 'Loading...' : 'Load Data'}
      </button>
      );
    }
  }
}
