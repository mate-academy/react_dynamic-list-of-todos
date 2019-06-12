import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
    this.loadItems = this.loadItems.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

  loadApi(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data);
  }

  loadItems() {
    Promise.all([
      this.loadApi('https://jsonplaceholder.typicode.com/todos'),
      this.loadApi('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([todos, users]) => this.setState({
        data: todos.map(item => ({
          ...item,
          user: users.find(user => item.userId === user.id),
          completed: item.completed ? 'Completed' : 'In-process'
        })),
        loaded: true
      }))
  }

  sortItems() {
    this.setState((state) => ({
      data: state.data.sort((a, b) => a.title.localeCompare(b.title))
    }))
  }

  render() {
    if(!this.state.loaded) {
      return <button className='load-btn' type='submit' onClick={this.loadItems}>Load page</button>
    }else if(this.state.loaded){
      return (
        <div>

          <table>
            <thead>
              <tr>
                <th><button type='submit' onClick={this.sortItems}>TODO</button></th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {this.state.data.map((item) => (
              <TodoItem
                key={item.title}
                title={item.title}
                completed={item.completed}
                userName={item.user.name}
              />
            ))}
            </tbody>
          </table>
        </div>
      )
    }

  }
}

export default TodoList;