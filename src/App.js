import React from 'react';
import './App.css';
import TodoList from "./TodoList.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    buttonState: 0,
    todos: [],
    users: [],
    }
  }
  
  loadUrl(url) {
    return fetch(url)
    .then(res => res.json())
    .then(data => data);
  }
  
  
  loadContent() {
    Promise.all([
    this.loadUrl('https://jsonplaceholder.typicode.com/todos'),
    this.loadUrl('https://jsonplaceholder.typicode.com/users')
    ]).then( ([todos, users]) => {
    this.setState({
    buttonState: 2,
    todos: todos,
    users: users
    });
    });
    this.setState({buttonState: 1});
  }
  
  render() {
    switch(this.state.buttonState) {
      case 0: {
        return ( <button onClick={this.loadContent.bind(this)}> Load </button>);
      }
    
      case 1: {
        return ( <button disabled> Loading... </button>);
      }
    
      case 2: {
        return <TodoList todoList={this.state.todos} userList={this.state.users} />
      }
    }
  }
}

export default App;
