import React, {Component} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      users: [],
      loaded: false,
      isLoading: false,
      disabled: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.sortTable = this.sortTable.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData(url) {
    return fetch(url)
      .then(res => res.json())
  }

  handleClick() {
    this.setState({
      isLoading: true,
      disabled: true
    });

    Promise.all([
      this.loadData('https://jsonplaceholder.typicode.com/todos'),
      this.loadData('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([todos, users]) => this.setState({
          loaded: true,
          todoList: todos,
          users: users
        })
      )
  }

  sortTable() {
    this.setState({
      todoList: this.state.todoList.sort((a, b) => a.title.localeCompare(b.title))
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.loaded
          ? <TodoList list={this.state.todoList} users={this.state.users} sort={this.sortTable}/>
          : (
            <div className="container">
              <button onClick={this.handleClick} disabled={this.state.disabled}>Load</button>
              {this.state.isLoading ? <div id='load'>Loading...</div> : null}
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
