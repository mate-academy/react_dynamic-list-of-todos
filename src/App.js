import React, { Component } from 'react';
import './App.css';
import todoWithUsers from './todoWithUsers';
import TodoList from './components/TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      users: null,
      todos: null,
      fullTodos: null,
    };
    this.LoadingData = this.LoadingData.bind(this);
    this.titleSort = this.titleSort.bind(this);
    this.userSort = this.userSort.bind(this);
    this.completeSort = this.completeSort.bind(this);
  }

  async LoadingData() {
    this.setState({ isLoading: true });
    let response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    const fullTodos = todoWithUsers(todos, users);
    this.setState({ todos, users, fullTodos });
  }

  titleSort() {
    const { fullTodos } = this.state;

    fullTodos.sort((a, b) => (a.title < b.title ? -1 : 1));
    this.setState({ fullTodos });
  }

  userSort() {
    const { fullTodos } = this.state;

    fullTodos.sort((a, b) => (a.user.id - b.user.id));
    this.setState({ fullTodos });
  }

  completeSort() {
    const { fullTodos } = this.state;

    fullTodos.sort(a => (a.completed ? -1 : 1));
    this.setState({ fullTodos });
  }

  render() {
    const {
      users, todos, isLoading, fullTodos,
    } = this.state;

    if (users === null || todos === null) {
      if (isLoading === true) {
        return (<span>Is Loading</span>);
      }
      return (
        <button onClick={this.LoadingData} type="button">
          Жмакни меня полностью!!!!
        </button>
      );
    }
    return (
      <>
        <span>Sort by : </span>
        <button type="button" onClick={this.titleSort}>Title</button>
        <button type="button" onClick={this.userSort}>User</button>
        <button type="button" onClick={this.completeSort}>Completed</button>

        <TodoList todos={fullTodos} />
      </>
    );
  }
}

export default App;
