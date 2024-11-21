import React, { Component } from 'react'
import TodoItem from './TodoItem.jsx';


export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.getItem = this.getItem.bind(this);
    this.sortList = this.sortList.bind(this);
  }

  loadData(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data);
  };

  sortList() {
    this.setState((prevState) => ({
      items: prevState.items.sort((a, b) => (a.title).localeCompare(b.title))
    }))
  };

  getItem() {
    Promise.all(
      [this.loadData('https://jsonplaceholder.typicode.com/todos'),
      this.loadData('https://jsonplaceholder.typicode.com/users')])
      .then(([todos, users]) => this.setState({
        items: todos.map(todoItem => ({
          ...todoItem,
          user: users.find(user => user.id === todoItem.userId),
        }))
      }))
  };

  render() {
    return (
      <div>
        <button onClick={this.getItem}>Load data</button>
        <button onClick={this.sortList}>Sort title</button>
        <table>
          <tbody>
            {this.state.items.map(item => <TodoItem key={item.id} item={item} />)}
          </tbody>
        </table>
      </div>
    )
  };
};
