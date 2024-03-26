import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      data: []
    }
    this.loadItems = this.loadItems.bind(this);
    this.sortTable = this.sortTable.bind(this);
  }

  loadData(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data)
  }
  
  sortTable() {
    this.setState((state) => ({
      data: state.data.sort((a, b) => a.title.localeCompare(b.title))
    }));
  }

  loadItems() {
    Promise.all([
      this.loadData('https://jsonplaceholder.typicode.com/todos'),
      this.loadData('https://jsonplaceholder.typicode.com/users')
    ])
      .then(([todos, users]) => {
        this.setState({
          data: todos.map((item) => ({
            ...item,
            user: users.find(user => user.id === item.userId)
          }))
        });
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.loadItems}>Load Data</button>
        <button onClick={this.sortTable}>Sort</button>
        <table>
          <tbody>      
            {this.state.data.map((item) => <TodoItem data={item} key={item.title}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TodoList;
