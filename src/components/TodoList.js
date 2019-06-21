import React, { Component } from "react";
import TodoItem from './Todoitem';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.getItem = this.getItem.bind(this);
    this.filterChanged = this.filterChanged.bind(this);
    this.state = {
      items: [],
      loaded: false,
      requested: false,
      filter: ''
    }
  }

  loadUrl(url) {
    return fetch(url)
      .then(response => response.json()).then(response => response);
  }

  getItem() {
    this.setState({
      requested: true
    });

   Promise.all(
     [this.loadUrl('https://jsonplaceholder.typicode.com/todos'),
      this.loadUrl('https://jsonplaceholder.typicode.com/users')]
    )
      'https://jsonplaceholder.typicode.com/todos'),
    this.loadUrl('https://jsonplaceholder.typicode.com/users')
    ])
      .then(([todos, users]) => this.setState({
      loaded: true,
      items: todos.map((item) => ({
        ...item,
        user: users.find(i => i.id === item.userId)
      }))
    }));
  }

  filterChanged(event) {
    this.setState({
     filter: event.target.value.trim()
    });
   }

  render() {
    if (this.state.loaded) {
      let components = [];
      components = (
        <table>
          <thead>
            <tr>
              <td>User</td>
              <td>Task</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
          {this.state.items.filter(item => (item.user.name.includes(this.state.filter) )).map(item => 
            <TodoItem data={item} key={item.title} />)}
          </tbody>
        </table>
      );
      return (
        <div>
          <input className='postSearcher' type='text' onChange={this.filterChanged} placeholder='Search the person'></input>
        {components}
        </div>
        );
        } else {
      return (
        <div>
          <button onClick={this.getItem}>{this.state.requested ? 'loading' : 'load data'}</button>
        </div>
      );
    }
  }
}

export default TodoList;
