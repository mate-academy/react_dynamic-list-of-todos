import React, { Component } from 'react';
import TodoList from '../TodoList/TodoList';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      todos: null,
      isLoading: false,
      error: false,
      sortingType: '',
    };
    this.loadTodos = this.loadTodos.bind(this);
    this.changeSortingType = this.changeSortingType.bind(this);
  }

  getTodosWithUsers = (todosList, usersList) => todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));

  getDatafromServer = async url => fetch(url)
    .then(response => response.json());

  changeSortingType(event) {
    this.setState({ sortingType: event.target.dataset.sortingType });
  }

  async loadTodos() {
    this.setState({
      isLoading: true,
      error: false,
      sortingType: '',
    });
    try {
      const [users, todos] = await Promise.all([
        this.getDatafromServer('https://jsonplaceholder.typicode.com/users'),
        this.getDatafromServer('https://jsonplaceholder.typicode.com/todos'),
      ]);
      this.setState({ users, todos });
    } catch (e) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      todos, users, isLoading, error, sortingType,
    } = this.state;

    if (users === null || todos === null) {
      return (
        <>
          {error ? <p>Opps...Try again later.</p> : null}
          <button type="button" onClick={this.loadTodos}>
            {`Load${isLoading ? 'ing...' : ''}`}
          </button>
        </>
      );
    }
    const todosWithUsers = this
      .getTodosWithUsers(todos, users)
      .sort((a, b) => {
        if (a[sortingType] > b[sortingType]) { return 1; }
        return -1;
      });
    return (
      <>
        <button
          type="button"
          onClick={this.changeSortingType}
          data-sorting-type="title"
        >
          Sort by title
        </button>
        <button
          type="button"
          onClick={this.changeSortingType}
          data-sorting-type="user"
        >
          Sort by user
        </button>
        <button
          type="button"
          onClick={this.changeSortingType}
          data-sorting-type="completed"
        >
          Sort by status
        </button>
        <TodoList todos={todosWithUsers} />
      </>
    );
  }
}

export default TodoApp;
