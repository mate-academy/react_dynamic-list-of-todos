import React from 'react';
import './TodoList.css';
import { getUsers, getTodos } from './data';
import UserTodoList from './UserTodoList';

class TodoList extends React.Component {
  state={
    isLoaded: false,
    isServerLoading: false,
    sortUsersByName: 1,
    sortTodoByDone: 1,
    users: [],
    todos: [],
  }

  handleClick = async() => {
    this.setState(prevState => ({
      isServerLoading: !prevState.isServerLoading,
    }));

    this.setState({
      users: await getUsers(),
      todos: await getTodos(),
    });

    this.setState(prevState => ({
      isLoaded: !prevState.isLoaded,
      isServerLoading: !prevState.isServerLoading,
    }));
  }

  handleCheckBox = (event) => {
    const { name, checked } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === +name) {
          item.completed = checked;
        }
        return item;
      }),
    }));
  }

  handleSortClick = () => {
    const { users } = this.state;
    this.setState(prevState => ({
      users: [...users].sort((userA, userB) => (
        prevState.sortUsersByName
        * userA.username.localeCompare(userB.username))),
      sortUsersByName: -prevState.sortUsersByName,
    }));
  }

  handleSortClickTodos = (event) => {
    const { name } = event.target;
    const { todos } = this.state;

    if (name === 'titleSort') {
      this.setState(prevState => ({
        todos: [...todos].sort((todoA, todoB) => (
          prevState.sortTodoByDone * todoA.title.localeCompare(todoB.title))),
        sortTodoByDone: -prevState.sortTodoByDone,
      }));
    } else {
      this.setState(prevState => ({
        todos: [...todos].sort((todoA, todoB) => (
          prevState.sortTodoByDone * (todoA.completed - todoB.completed))),
        sortTodoByDone: -prevState.sortTodoByDone,
      }));
    }
  }

  getUsers = () => this.state.users.map(user => (
    {
      ...user,
      usertodos: this.state.todos.filter(todo => todo.userId === user.id),
    }
  ))

  render() {
    const userWithOwnTodos = this.getUsers();
    const { isLoaded, isServerLoading } = this.state;

    const usersTodoLists = userWithOwnTodos
      .map(user => (
        <UserTodoList
          key={user.id}
          user={user}
          handleCheckBox={this.handleCheckBox}
          handleSortClickTodos={this.handleSortClickTodos}
          handleSortClick={this.handleSortClick}
        />
      ));

    const loader = isServerLoading && <div className="loader" />;

    const loadButton = isServerLoading
      || (
        <button
          className="button"
          type="button"
          onClick={this.handleClick}
          style={{ backgroundColor: !isLoaded && '#000000' }}
        >
          {isLoaded ? 'Delete all Todos' : 'Load Todos from server'}
        </button>
      );

    const display = isServerLoading
      || (isLoaded
      && (
        <>
          <button
            className="button--link"
            onClick={this.handleSortClick}
            type="button"
          >
              Sort users by UserName
          </button>

          {usersTodoLists}
        </>
      ));

    return (
      <div>
        {loader}
        {display}
        {loadButton}
      </div>
    );
  }
}

export default TodoList;
