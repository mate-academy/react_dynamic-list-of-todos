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
  }


  handleClick() {
    this.setState({
      isLoading: true,
      disabled: true
    });

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        this.setState({
          todoList: data
        })
      });

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.setState({
          users: data,
          loaded: true,
          isLoading: false
        })
      });
  }

  sortTable(){
    this.setState({
      todoList: this.state.todoList.sort((a, b) => a.title.localeCompare(b.title))
    });
  }


  render() {
    return (
      <div>
        {this.state.loaded ? <TodoList list={this.state.todoList} users={this.state.users} sort={this.sortTable}/> :
          <div>
            <button onClick={this.handleClick} disabled={this.state.disabled}>Load</button>
            {
              this.state.isLoading ? <p id='load'>Loading...</p> : null
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
