import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      requested: false,
      data: []
    }
    this.loadData = this.loadData.bind(this);
    this.sortTodoItems = this.sortTodoItems.bind(this);
  }

  loadUrl(url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => data);
  }

  loadData() {
    this.setState({
      requested: true
    });

    Promise.all([
      this.loadUrl('https://jsonplaceholder.typicode.com/todos'),
      this.loadUrl('https://jsonplaceholder.typicode.com/users')
    ])
    .then(([todos, users]) => this.setState({
      loaded: true,
      data: todos.map((todosItem) => ({
        ...todosItem,
        completed: todosItem.completed ? 'completed' : 'working',
        user: users.find(user => todosItem.userId === user.id),
        author: users.find(user => todosItem.userId === user.id).name
      }))
    }))
  }

  sortTodoItems(fieldName) {
    this.fieldName = fieldName;
    this.setState((state) => ({
      data: state.data.sort((a, b) => a[this.fieldName].localeCompare(b[this.fieldName]))
    }))
  }

  render() {
    if(!this.state.requested) {
      return <button className='download' onClick={this.loadData}>Download</button>
    } else if(this.state.loaded) {
      return (
      <table>
        <thead>
          <tr>
            <th><button className='tableTitle' onClick={this.sortTodoItems.bind(this, 'title')}>Title</button></th>
            <th><button className='tableTitle' onClick={this.sortTodoItems.bind(this, 'author')}>Author</button></th>
            <th><button className='tableTitle' onClick={this.sortTodoItems.bind(this, 'completed')}>State</button></th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(todoItem => <TodoItem key={todoItem.title} data={todoItem} />)}
        </tbody>
      </table>
      )
    } else {
      return <div className='loading'>Loading...</div>
    }
  }
}
