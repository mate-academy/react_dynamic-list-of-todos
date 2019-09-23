import React from "react";
import "./App.css";

import { TodoList } from "./components/TodoList/TodoList";

import { getTodos } from "./api/todos";
import { getUsers } from "./api/users";

function getTodosWithUsers(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId)
  }));
}

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    isLoaded: false,
    hasError: false
  };

  sortByName = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => (a.user > b.user ? 1 : -1))
    }));
  };

  sortByTitle = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) => (a.title > b.title ? 1 : -1))
    }));
  };

  sortByCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.sort((a, b) =>
        a.completed < b.completed ? 1 : -1
      )
    }));
  };

  getData = () => {
    this.setState({
      todos: [],
      isLoading: true,
      hasError: false
    });

    getTodos().then(data => {
      this.setState({
        todos: data
      });
    });

    getUsers().then(data => {
      this.setState({
        users: data
      });
    });

    Promise.all([getTodos(), getUsers()])
      .then(() => {
        this.setState({
          isLoaded: true
        });
      })
      .catch(() => {
        this.setState({
          hasError: true
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    const { todos, users, isLoading, hasError, isLoaded } = this.state;
    const preparedTodos = getTodosWithUsers(todos, users);
    return (
      <div className="main">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {todos.length}
          <br />
          <span>Users: </span>
          {users.length}
        </p>
        {!todos.length && !users.length && !isLoading && !hasError && (
          <button
            type="button"
            onClick={this.getData}
            className="btn btn-outline-dark"
          >
            Load todos
          </button>
        )}
        {isLoading && (
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {hasError && (
          <>
            <h3>Something went wrong:(</h3>
            <button
              type="button"
              onClick={this.getData}
              className="btn btn-outline-dark"
            >
              Try again
            </button>
          </>
        )}
        {isLoaded && (
          <TodoList
            todos={preparedTodos}
            sortByName={this.sortByName}
            sortByTitle={this.sortByTitle}
            sortByCompleted={this.sortByCompleted}
          />
        )}
      </div>
    );
  }
}

export default App;
