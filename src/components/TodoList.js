import React, {Component} from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      loaded: false,
      items: []
    }
    this.getItem = this.getItem.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

   loadingUrl(url) {
    return fetch(url)
    .then(response => response.json()).then(response => response);
  }

  getItem() {
    this.setState({
      requested: true
    });
    Promise.all([this.loadingUrl(' https://jsonplaceholder.typicode.com/todos'), 
      this.loadingUrl('https://jsonplaceholder.typicode.com/users')])
      .then(([todos, users]) => this.setState({
        loaded: true,
        items: todos.map(item => ({
          ...item,
          user: users.find((i) => i.id === item.userId)
        }))
      }));
  }

  sortItems() {
    this.setState(prevState => ({
      items: prevState.items.sort((a, b) => a.title.localeCompare(b.title))
    }))
  }

  render() {
    if(!this.state.requested) {
      return <button onClick = {this.getItem}>Load data</button>
    } else if (this.state.loaded) {
      return (
        <div>
          <button onClick = {this.getItem}>Load data</button>
          <button onClick = {this.sortItems}>Sort titles</button>
          {this.state.items.map(item => <TodoItem key = {item.title} item = {item} />)}
        </div>
      );
    } else {
      return <button onClick = {this.getItem} disabled>Loading</button>
   }   
  }
}
