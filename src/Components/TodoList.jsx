import React, { Component } from 'react';
import TodoItem from './TodoItem.jsx';

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.getItem = this.getItem.bind(this);
    this.sortTitle = this.sortTitle.bind(this);
  }
  loadUrl(url) {
    return fetch(url)
    .then(response => response.json()).then(response => response)
  }

  getItem() {
    Promise.all([this.loadUrl('https://jsonplaceholder.typicode.com/todos'),
      this.loadUrl('https://jsonplaceholder.typicode.com/users')])
      .then(([todos, users]) => this.setState({
        items: todos.map(item => ({
          ...item,
          user: users.find((i) => i.id === item.userId)
        }))
      }))
    }
  sortTitle() {
    this.setState(prevState => ({
      items: prevState.items.sort((a, b) => a.title.localeCompare(b.title))
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.getItem}>Click me!</button>
        <button onClick={this.sortTitle}>Title</button>
      <table>
        {this.state.items.map(item => <TodoItem key={item.id} item={item}/>)}
      </table>
      </div>
    )
  }
}
