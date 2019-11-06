import React, { Component } from 'react';
import TodoList from '../TodoList/TodoList';

class TodoLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      todos: null,
      isLoading: false,
    };
    this.usersUrl = 'https://jsonplaceholder.typicode.com/users';
    this.todosUrl = 'https://jsonplaceholder.typicode.com/todos';
    this.loadTodos = this.loadTodos.bind(this);
    this.getTodosWithUsers = this.getTodosWithUsers.bind(this);
    this.getDataFromServer = this.getDataFromServer.bind(this);
  }

  getTodosWithUsers = (todoList, userList) => {
    const userMap = new Map();
    userList.forEach(user => userMap.set(user.id, user));

    return todoList.map(todo => ({
      ...todo,
      user: userMap.get(todo.userId),
    }));
  }

  getDataFromServer = async url => fetch(url)
    .then(response => response.json());

  async loadTodos() {
    this.setState({
      isLoading: true,
    });
    const [users, todos] = await Promise.all([
      this.getDataFromServer(this.usersUrl),
      this.getDataFromServer(this.todosUrl),
    ]);
    this.setState({
      users,
      todos,
      isLoading: false,
    });
  }

  render() {
    const { todos, users, isLoading } = this.state;

    return (!users || !todos) ? (
      <button type="button" onClick={this.loadTodos}>
        {isLoading ? 'Loading...' : 'Load'}
      </button>
    ) : (
      <TodoList todos={this.getTodosWithUsers(todos, users)} />
    );
  }
}

export default TodoLoad;
