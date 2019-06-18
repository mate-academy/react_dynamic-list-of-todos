import React, { Component } from 'react';
import TodoItems from './TodoItems';

export default class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      download: false,
    }

    this.getData = this.getData.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

  loadData(url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => data)
  }

  getData() {
    this.setState({
      loaded: true,
    });

    Promise.all([
      this.loadData('https://jsonplaceholder.typicode.com/users'),
      this.loadData('https://jsonplaceholder.typicode.com/todos')
    ])
    .then(([users, todos]) => this.setState({
      download: true,
      data: todos.map((todos) => ({
      ...todos,
      completed: todos.completed ? 'yes' : 'no',
      user: users.find(user => todos.userId === user.id),
      }))
    }))
  }

  sortItems() {
    this.setState((state) => ({
      data: state.data.sort((a, b) => a.title.localeCompare(b.title))
    }));
  }

  render() {
    if(!this.state.loaded) {
      return <button className='download' onClick={this.getData}>Download</button>
    } else if (this.state.download) { 
      return (
        <table>
          <thead>
            <tr>
              <th><span className='tableTitle' onClick={this.sortItems}>Title</span></th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map(todos => <TodoItems key={todos.title} data={todos} />)}
          </tbody>
        </table>
      )
    } else {
        return <div className='loading'>Loading..</div>
    }
  }

}
