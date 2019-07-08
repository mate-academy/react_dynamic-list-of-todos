import React from 'react';

import './TodoList.css';

import UserTodoList from './UserTodoList';

const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json());

const getTodos = () => fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json());

class TodoList extends React.Component {
  state={
    isLoading: true,
    isServerLoading: false,
    sortUsersByName: 1,
    sortTodoByDone: 1,
    users: [],
    todos: [],
  }

  handleClick = () => {
    this.setState(prevState => ({
      isServerLoading: !this.state.isServerLoading,
    }));

    setTimeout(async() => {
      this.setState(prevState => ({
        isLoading: !prevState,
        isServerLoading: !prevState,
      }));
      this.setState({
        users: await getUsers(),
        todos: await getTodos(),
      });
    }, 500);
  }

  handleCheckBox = (event) => {
    const { name, checked } = event.target;

    this.setState({
      todos: this.state.todos.map((item) => {
        if (item.id === +name) {
          item.completed = checked;
        }
        return item;
      }),
    });
  }

  handleSortClick = () => {
    this.setState({
      users: this.state.users.sort((userA, userB) => (
        this.state.sortUsersByName
        * userA.username.localeCompare(userB.username))),
      sortUsersByName: -this.state.sortUsersByName,
    });
  }

  handleSortClickTodos = (event) => {
    const { name } = event.target;

    if (name === 'titleSort') {
      this.setState({
        todos: this.state.todos.sort((todoA, todoB) => (
          this.state.sortTodoByDone * todoA.title.localeCompare(todoB.title))),
          sortTodoByDone: -this.state.sortTodoByDone,
      });
    } else {
      this.setState({
        todos: this.state.todos.sort((todoA, todoB) => (
          (todoA.completed === todoB.completed)
            ? 0 : todoA.completed
              ? this.state.sortTodoByDone
              : -this.state.sortTodoByDone)),
        sortTodoByDone: -this.state.sortTodoByDone,
      });
    }
  }

  render() {
    const userWithOwnTodos = this.state.users.map(user => (
      {
        ...user,
        usertodos: this.state.todos.filter(todo => todo.userId === user.id),
      }
    ));

    const usersTodoLists = userWithOwnTodos
      .map(user => (
        <UserTodoList
          key={user.id}
          user={user}
          handleCheckBox={this.handleCheckBox}
          handleSortClickTodos={this.handleSortClickTodos}
        />
      ));

    const loader = this.state.isServerLoading && <div className="loader" />;

    const loadButton = this.state.isServerLoading
      || (
        <button
          className="button"
          onClick={this.handleClick}
          style={{ backgroundColor: !this.state.isLoading && '#000' }}
        >
          {this.state.isLoading ? 'Load Todos' : 'Hide Todos'}
        </button>
      );

    const display = this.state.isServerLoading || this.state.isLoading || usersTodoLists;
    const sortByUserName = this.state.isServerLoading
      || this.state.isLoading
      || (
        <button className="button--link" onClick={this.handleSortClick}>
          Sort users by UserName
        </button>
      );

    return (
      <div>
        {sortByUserName}
        {loader}
        {display}
        {loadButton}
      </div>
    );
  }
}

export default TodoList;
