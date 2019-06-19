import React, { Component } from 'react';
import TodoList from './component/TodoList';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.data = [this.props.urlUsers, this.props.urlTodos];
    this.state = {
      todos: [],
      users: [],
      status: 'before download'
    };
    this.showTodos = this.showTodos.bind(this);
  }

  createPromise(url) {
    return fetch(url).then(resp => resp.json());
  }

  getAllData(urls) {
    return Promise.all(urls.map(url => this.createPromise(url)));
  }

  init() {
    this.getAllData(this.data).then(responses => this.parseData(responses));
  }

  parseData(dataArrs) {
    const todos = dataArrs[1];
    const users = this.usersToObj(dataArrs[0]);
    this.setState(() => ({
      todos: todos,
      users: users,
      status: 'redy to show'
    }));
  }

  showTodos() {
    this.setState(state => state.status = 'loading');
    this.init();
  }

  usersToObj(users) {
    const newObj = users.reduce(((acc, user) => {
      acc[user.id] = user;
      return acc;
    }), {});
    return newObj;
  }

  render() {
    return (
      <div>
        {this.state.status === 'before download'
          && <button className="download" onClick={this.showTodos}>
            Show Todos!</button>}
        {this.state.status === 'loading'
          && <button className="download" disabled>Loading...</button>}
        {this.state.status === 'redy to show'
          && <TodoList todos={this.state.todos} users={this.state.users} />}
      </div>
    );
  }
}
