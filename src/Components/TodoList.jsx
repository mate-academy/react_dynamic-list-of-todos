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
  getUrl(url) {
    return fetch(url)
    .then(response => response.json()).then(response => response)
  }

  getItem() {
    Promise.all([
      this.getUrl('https://jsonplaceholder.typicode.com/todos'),
      this.getUrl('https://jsonplaceholder.typicode.com/users')])
      .then(([todoS, users]) => this.setState({
        items: todoS.map(item => ({
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
        <button onClick={this.getItem}>Load Content</button>
        <button onClick={this.sortTitle}>Change on Title</button>
      <table>
        {this.state.items.map(item => <TodoItem key={item.id} item={item}/>)}
      </table>
      </div>
    )
  }
}
